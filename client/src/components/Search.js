import React, { useEffect, useRef } from "react";
import AnimalResultLayout from "./AnimalResultLayout";
import "../App.scss";

let key = "ssg62RKnSfXN0CwnanhRQRMwwwZTvuGnt8BE3th4ujwGKi3Dc4";
let secret = "xCknCe8Vbez42FlMgPWdK95ngdg5G0lIMXSLB9FB";
//need to add search validation, "please choose a valid postal code"," you must select an animal type"

export default function Search() {
  const [token, setToken] = React.useState("");
  //animals will be an array, should this even be in state?
  //animals is passed to search from context, and animals changes from search component every time user clicks search
  const [animals, setAnimals] = React.useState("");
  //get this from the search form
  const [zipCode, setZipCode] = React.useState(70130);
  //set state to something so our animal array renders on render.
  const [animalType, setAnimalType] = React.useState("dog");

  //handle submitted form
  const handleSubmit = (e) => {
    e.preventDefault();

    //api call to petfinder
    getAnimals();
    //reset user input
    setAnimalType("");
    setZipCode("");
  };

  //function for retrieving token
  const getToken = async () => {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", key);
    params.append("client_secret", secret);

    const token = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      body: params,
    });
    //set await to variable so promise is handled
    const authToken = await token.json();
    // console.log(await token.json());
    //set token using state
    setToken(authToken.access_token);

    localStorage.setItem("token", authToken.access_token);
    console.log(token);
  };
  //handler for search params type
  const typeHandler = (e) => {
    setAnimalType(e.target.value);
  };
  //handler for api call for getting animals from search form params
  const zipCodeHandler = (e) => {
    setZipCode(e.target.value);
  };
  const getAnimals = async (req, res) => {
    try {
      const response = await fetch(
        `https://api.petfinder.com/v2/animals?type=${animalType}&location=${zipCode}`,
        {
          method: "GET",
          //   mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      //set animals
      const result = await response.json();
      setAnimals(result.animals);
    } catch (err) {
      console.log(err);
    }
  };
  //
  useEffect(() => {
    getToken();

    getAnimals();
    setAnimalType("");
    setZipCode("");
    console.log(zipCode, animalType, animals);
    console.log("use efect on frist load");
  }, []);

  console.log(token, "token", animals, "animals");

  return (
    <>
      {/**is this appropiate jsx? */}
      <form className="search-bar" onSubmit={handleSubmit}>
        <select value={animalType} onChange={typeHandler}>
          <option>Pick</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <input type="number" value={zipCode} onChange={zipCodeHandler} />

        <input type="submit" />
      </form>
      <AnimalResultLayout animals={animals} />
    </>
  );
}
