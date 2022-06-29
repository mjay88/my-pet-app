import React from "react";
import "../App.scss";

const AnimalCard = (props) => {
  const { animal } = props;
  const [loading, setLoading] = React.useState(false);

  const likeHandler = async (e) => {
    setLoading(true);
    console.log(e.target.id);
    //get liked pet from pet finder via pet id
    const response = await fetch(
      `https://api.petfinder.com/v2/animals/${e.target.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    const result = await response.json();
    console.log(result.animal.age);

      const animalToSave = result.animal;
console.log(animalToSave, 'animalToSave')
      const favorite = {
        age: animalToSave.age,
        petId: animalToSave.id,
        petName: animalToSave.name,
        species: animalToSave.species,
        breed: animalToSave.breed,
        photo: animalToSave.photos.full,
      };

      //post request to database
      const response2 = await fetch(`http://localhost:5000/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favorite),
      });

      const result2 = await response2.json();
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
          <button className="ripple btn1" onClick={likeHandler}>
            {loading ? "Liked" : "Like"}
          </button>
          <button className="ripple btn2" >More Info!</button>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
