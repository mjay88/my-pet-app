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
    userFavoritesIds,
    user,
    getCurrentUser,
    userFavoritesIdsReturnFromPetFinder,
  } = useGlobalContext();
  //this doesn't need to be here, userFavoritesIds should be populated from inside context...
  //7/12 need to only save one favorite to db
  //FavoritesLayout needs to make to api calls
  //the first one to retrieve our animal id numbers from the data base
  //the second one is to petfinder  api to retrieve the most current version of that pet

  console.log(userFavoritesIds, "current user");
  const uniqueFavorites = [...new Set(userFavoritesIds)];
  console.log(uniqueFavorites, "unique");
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
            console.log(data, "data from inside getPets");
            return data;
          } catch (err) {
            console.log(err.response, "err.response from inside getPets"); // this is the main part. Use the response property from the error object

            return err.response;
          }
        })
      )
    );
  };

  useEffect(() => {
    // getFavorites();
    getCurrentUser();
    // getPetIds();
    getPets(uniqueFavorites);
  }, []);

  console.log(renderFavs, "renderFavs in favs layout");
 

  return (
    //this works because of getCurrent user in global context
    <div className="favorites-results">
      {user.name}

     

      <div className="animal-results">
       {renderFavs.length > 0 && renderFavs.map(fav =>{
        if(fav.status === 200){
          return <AnimalCard
          key={fav.data.animal.id}
          animal={fav.data.animal}
        />
        } return <div className="animal-card">
        <h1 className="animal-card__header">Sorry, this little buddy has already found a forever home</h1>
      
        
        <div className="animal-card__inner-content">
       
        </div>
    
        </div>        
       })}
     
      </div>
    </div>
  );
};

export default FavoritesLayout;
