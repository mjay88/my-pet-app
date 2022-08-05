import React, { useState } from "react";
import "../App.scss";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

const AnimalCard = (props) => {
  const { animal } = props;
  const [loading, setLoading] = useState(false);
  const { user, addFav, userFavorites, removeFav } = useGlobalContext();
  const [unliked, setUnliked] = useState(false);
  //try seperating the logic that deals with state from the logic that deals with updating database i.e. the post request
  // console.log(props, "here is a prop")
  // console.log(animal, "top of animal card");
  // console.log(userFavorites, "userFavorites top of animal card")

  //rename userFavorites petId key to id, copy by reference issue?
  const modedUserFavorites = userFavorites.map((item) => {
    return {
      ...item,
      id: item.petId,
    };
  });

  const userFavoritesIds = userFavorites.map((pet) => {
    return pet.petId;
  });

  // console.log(modedUserFavorites, "modedUserFavorites")

  //deal with case of liking something twice
  const likeHandler = async (e) => {
    if(!user){
      alert("You must be logged in to save animals! Please login or register for an account!");
      setLoading(false);
    } else {
    setLoading(true);

    const favorite = {
      age: animal.age,
      petId: animal.id,
      petName: animal.name,
      species: animal.species,
      breed: animal.breeds.primary,
      photo: animal.photos[0].full,
    };
    //post request to database
    const postResponse = async () => {
      try {
        //how to pass the right content through???

        axios.post("/api/favorites/", favorite).then((res) => {
          //?does addFav need to be here? is this redundant?
          addFav(favorite);
        });
      } catch (err) {
        console.log(err);
      }
    };

    const result2 = postResponse();
    if (result2.success === true) {
    }

    setLoading(true);
}};
  //
  const unlikeHandler = async (animal) => {
    setLoading(true);
    //this formating is specific to delete in mongo, {data: {animalId:id}}!!!!
    console.log(animal, "id inside unlikeHandler");
    await axios
      .delete("/api/favorites/", { data: { animalId: animal } })
      .then(() => {
        removeFav(animal);
        setUnliked(true);
      });
  };
  // console.log(modedUserFavorites.includes(), 'includeds')

  return unliked ? (
    <div></div>
  ) : (
    <div className="animal-card">
      {animal.photos && animal.photos[0] && animal.photos[0].full ? (
        <img
          src={animal.photos[0].full}
          alt={"adoptable animal"}
          className="animal-card__image"
        />
      ) : (
        <div>
          <span>No Photo Found</span>
        </div>
      )}
      <div className="animal-card__content">
        <h1 className="animal-card__header">{animal.name}</h1>
        <p>{animal.species}</p>
        <p>{animal.age}</p>
        <p>{animal.breeds.primary}</p>
        <div className="animal-card__inner-content">
          {/*handle edgecases */}
          {userFavoritesIds.includes(animal.id) ? (
            <button
              className="ripple btn1"
              id={animal.id}
              onClick={() => unlikeHandler(animal.id)}
            >
              {loading ? "Unliked" : "Unlike"}
            </button>
          ) : (
            <button
              className="ripple btn1"
              id={animal.id}
              onClick={likeHandler}
            >
              {loading ? "Liked" : "Like"}
            </button>
          )}
          <a href={animal.url} target="_blank" rel="noreferrer">
          <button className="ripple btn2">More Info!</button>
        </a>
       
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
