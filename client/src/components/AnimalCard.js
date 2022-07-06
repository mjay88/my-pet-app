import React from "react";
import "../App.scss";
import axios from "axios";

const AnimalCard = (props) => {
  const { animal } = props;
  // console.log(animal.name, "animal to card")
  const [loading, setLoading] = React.useState(false);

  const likeHandler = async (e) => {
    setLoading(true);
    console.log(e.target.id, "clicked");
    //get liked pet from pet finder via pet id
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
        breed: animalToSave.breed,
        photo: animalToSave.photos.full,
      };
console.log(favorite, "favorite")
      //post request to database
      //does this function need to get the current user first? so we know where to post or something, add required auth from permissions?
      //switch to axios!!!
      const postResponse = async () => {
        try {
          //how to pass the right content through???
          
          axios.post("/api/favorites/", favorite).then(res => {
            console.log(res.data, "res.data")
          }) 
        } catch (err) {
          console.log(err);
      
        }
       
    }
      // const response2 = await fetch(`http://localhost:5000/api/favorites`, {
      //   method: "POST",
      //   mode: "no-cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(favorite),
      // });

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
