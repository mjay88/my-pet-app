import React from "react";
import "../App.scss";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";


const AnimalCard = (props) => {
  const { animal } = props;
  // console.log(animal.name, "animal to card")
  const [loading, setLoading] = React.useState(false);
  const {addFav} = useGlobalContext();
  //try seperating the logic that deals with state from the logic that deals with updating database i.e. the post request
  const likeHandler = async (e) => {
    setLoading(true);
    console.log(e.target.id, "clicked");
    
   
    const response =  await fetch(
      `https://api.petfinder.com/v2/animals/${e.target.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const result =  await response.json();
    console.log(result, 'result')
      const animalToSave =  result.animal;
      const favorite = {
        age: animalToSave.age,
        petId: animalToSave.id,
        petName: animalToSave.name,
        species: animalToSave.species,
        breed: animalToSave.breeds.primary,
        photo: animalToSave.photos[0].full,
      };
console.log(favorite, "favorite from animal card")
      //post request to database
      const postResponse = async () => {
        try {
          //how to pass the right content through???
          
          axios.post("/api/favorites/", favorite).then(res => {
            console.log(res.data, "res.data")
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
          <button className="ripple btn1" id={animal.id} onClick={likeHandler}>
            {loading ? "Liked" : "Like"}
          </button>
          <button className="ripple btn2" >More Info!</button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
