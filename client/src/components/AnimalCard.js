import React from "react";
import "../App.scss";

const AnimalCard = (props) => {
  const { animal } = props;

  return (
    <div className="animal-card">
      <div className="animal-card__inner">
      <div className="animal__image" component="img">
        {animal.photos && animal.photos[0] && animal.photos[0].full ? (
          <img src={animal.photos[0].full} alt={"adoptable animal"} />
        ) : (
          <div>
            <span>No Photo Found</span>
          </div>
        )}
      </div>
      <h1 className="animal-card__header">{animal.name}</h1>
      <div className="animal-card__content">
        <p>{animal.species}</p>
        <p>{animal.age}</p>
        <p>{animal.breeds.primary}</p>
        <p></p>
      </div>
      </div>
    </div>
  );
};

export default AnimalCard;
