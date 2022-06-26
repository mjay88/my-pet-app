import React from "react";
import "../App.scss";

const AnimalCard = (props) => {
  const { animal } = props;

  return (
    <div className="animal-card">
      {animal.photos && animal.photos[0] && animal.photos[0].full ? (
        <img  src={animal.photos[0].full} alt={"adoptable animal"} className="animal-card__image" />
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
         
        <button className="ripple btn1">Like</button>
        <button className="ripple btn2">More Info!</button> 

        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
