import React from "react";
import "../App.scss";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";


const AnimalCard = (props) => {
  const { animal } = props;
  // console.log(animal.name, "animal to card")
  const [loading, setLoading] = React.useState(false);
  const {addFav, userFavoritesIds, removeFav} = useGlobalContext();
  console.log(userFavoritesIds, "from inside the top of animalCard")
  //try seperating the logic that deals with state from the logic that deals with updating database i.e. the post request
  const likeHandler = async (e) => {
    setLoading(true);
    console.log(e.target.id, "clicked");
    

      const favorite = {
        age: animal.age,
        petId: animal.id,
        petName: animal.name,
        species: animal.species,
        breed: animal.breeds.primary,
        photo: animal.photos[0].full,
      };
// console.log(favorite, "favorite from animal card")
      //post request to database
      const postResponse = async () => {
        try {
          //how to pass the right content through???
          
          axios.post("/api/favorites/", favorite).then(res => {
            console.log(res.data, "res.data", favorite, 'favorite in animalcard, still saving double')
            //?does addFav need to be here? is this redundant? 
            addFav(favorite);
          }) 


        } catch (err) {
          console.log(err);
      
        }
       
    }
   
      const result2 = postResponse();
      if (result2.success === true) {
        console.log("favorite saved");
      }

      setLoading(false);
  };
//
  const unlikeHandler = async (animal) => {
    setLoading(true);
     //this formating is specific to delete in mongo, {data: {animalId:id}}!!!!
  console.log(animal, 'from inside unlike')
  
    await axios.delete("/api/favorites/", {data: {animalId:animal}}).then(() => {
      removeFav(animal);
    })
    

  }

  return (
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
          {
            userFavoritesIds.includes(animal.id) ?   <button className="ripple btn1" id={animal.id} onClick={() => unlikeHandler(animal.id)}>
            {loading ? "Unliked" : "Unlike"}
          </button> :

          
          <button className="ripple btn1" id={animal.id} onClick={likeHandler}>
            {loading ? "Liked" : "Like"}
          </button>
}
          <button className="ripple btn2" >More Info!</button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
