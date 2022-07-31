import React from "react";
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import AnimalCard from "./AnimalCard";
import axios from "axios";
import "../App.scss";

//review my GlobalContext with Basit, this may be were my password hashing is getting fucked up, and I should be retrieving favorites from there?, but we save to the data base in Search.js not GlobalContextl like example
let key = "ssg62RKnSfXN0CwnanhRQRMwwwZTvuGnt8BE3th4ujwGKi3Dc4";
let secret = "xCknCe8Vbez42FlMgPWdK95ngdg5G0lIMXSLB9FB";

const FavoritesLayout = (props) => {
  //probably should save the
  const [token, setToken] = React.useState("");
  const [renderFavs, setRenderFavs] = React.useState("");

  const {
    //userFavorites is whats saved in our database
    userFavorites,

    user,
  } = useGlobalContext();
  //this doesn't need to be here, userFavoritesIds should be populated from inside context...
  //7/12 need to only save one favorite to db
  //FavoritesLayout needs to make to api calls
  //the first one to retrieve our animal id numbers from the data base
  //the second one is to petfinder  api to retrieve the most current version of that pet

  //create new fucntion that
  //iterates through userFavorites
  //for every favorite, make an call to petfinder based on that favorites petId to return the most up to date status of that pet
  //update the current favorite to reflect...
  //if status code was 404, animal is no longer available
  //if status code 200, update all pertinent fields, leaving object._id?

  const userFavoritesIds = userFavorites.map((pet) => {
    return pet.petId;
  });

  //make api call to petfinder with promise.all to get all pets stored in userFavoritesIds and setRenderFavs

  const getPets = async (arrayOfIds) => {
    setRenderFavs(
      await Promise.all(
        arrayOfIds.map(async (id) => {
          try {
            const response = axios.get(
              `https://api.petfinder.com/v2/animals/` + id,

              {
                method: "GET",
                // mode: "no-cors",

                headers: {
                  "Content-Type": "application/json",

                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );

            const data = await response;
            //only the error returns if not 404?
            console.log(data, "line 72");
            if (data.status === 200) {
              const newData = {
                age: data.data.animal.age,
                petId: data.data.animal.id,
                id: data.data.animal.id,
                petName: data.data.animal.name,
                species: data.data.animal.species,
                breed: data.data.animal.breeds.primary,
                photo: data.data.animal.photos[0].full,
              };
              console.log(newData, "newData")
            }

            return data;
          } catch (err) {
            console.log(err.response, "404 error"); // this is the main part. Use the response property from the error object

            return err.response;
          }
        })
      )
    );
  };

  //create new fucntion that
  //iterates through userFavorites
  //for every favorite, make an call to petfinder based on that favorites petId to return the most up to date status of that pet
  //update the current favorite to reflect...
  //if status code was 404, animal is no longer available
  //if status code 200, update all pertinent fields, leaving object._id?
  // const newGetPets = async (array) => {
  //   await Promise.all(
  //     array.map(async (obj) => {
  //       try {
  //         const response = axios.get(
  //           `https://api.petfinder.com/v2/animals/` + obj.petId,

  //           {
  //             method: "GET",
  //             // mode: "no-cors",

  //             headers: {
  //               "Content-Type": "application/json",

  //               Authorization: "Bearer " + localStorage.getItem("token"),
  //             },
  //           }
  //         );
  //         const data = await response;
  //         //deal with edge case if data.status === 404 what to do?
  //         // if(data.status) this essential returns a boolean because the error is spit out in the catch
  //         //create new object to return
  //         const newData = {
  //           age: data.data.animal.age,
  //           petId: data.data.animal.petId,
  //           petName: data.data.animal.name,
  //           species: data.data.animal.species,
  //           breed: data.data.animal.breeds.primary,
  //           photo: data.data.animal.photos[0].full,
  //         };
  //         //deal with edge cases before returning
  //         return data;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     })
  //   );
  // };

  //compare userFavorites

  useEffect(() => {
    getPets(userFavoritesIds);
  }, []);

  console.log(userFavorites, "favoritesLayout userfavorites");
  console.log(renderFavs, "favoritesLayout renderfavs");
  // console.log(renderFavs[0].data.animal, 'favoritesLayout renderfavs[0]')

  // console.log(userFavoritesIds, 'favoritesLayout userfavoritesIds')

  return (
    //this works because of getCurrent user in global context
    <div className="favorites-results">
      {user.name}

      <div className="animal-results">
        {renderFavs.length > 0 &&
          renderFavs.map((fav) => {
            if (fav.status === 200) {
              return (
                <AnimalCard key={fav.data.animal.id} animal={fav.data.animal} />
              );
            }
            return (
              <div className="animal-card">
                <h1 className="animal-card__header">
                  Sorry, this little buddy has already found a forever home
                </h1>

                <div className="animal-card__inner-content"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FavoritesLayout;
