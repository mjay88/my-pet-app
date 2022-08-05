import React, { useEffect, useRef } from "react";
import AnimalResultLayout from "./AnimalResultLayout";
import "../App.scss";
import { useGlobalContext } from "../context/GlobalContext";

let key = "ssg62RKnSfXN0CwnanhRQRMwwwZTvuGnt8BE3th4ujwGKi3Dc4";
let secret = "xCknCe8Vbez42FlMgPWdK95ngdg5G0lIMXSLB9FB";
//need to add search validation, "please choose a valid postal code"," you must select an animal type"

export default function Search() {
  // const [token, setToken] = React.useState("");
  //animals will be an array, should this even be in state?
  //animals is passed to search from context, and animals changes from search component every time user clicks search
  const [animals, setAnimals] = React.useState("");
  //get this from the search form
  const [zipCode, setZipCode] = React.useState(70130);
  //set state to something so our animal array renders on render.
  const [animalType, setAnimalType] = React.useState("dog");
  //token should now be in context
  const {token, user} = useGlobalContext();
  console.log(user, 'user in search')
  //handle submitted form
  const handleSubmit = (e) => {
    e.preventDefault();

    //api call to petfinder
    getAnimals();
    //reset user input
    setAnimalType("");
    setZipCode("");
  };

  //handler for search params type
  const typeHandler = (e) => {
    setAnimalType(e.target.value);
  };
  //handler for api call for getting animals from search form params
  const zipCodeHandler = (e) => {
    setZipCode(e.target.value);
  };
  //convert to axios
  const getAnimals = async (req, res) => {
    try {
      const response = await fetch(
        `https://api.petfinder.com/v2/animals?type=${animalType}&location=${zipCode}&limit=50`,
        {
          method: "GET",
            // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      //set animals
      const result = await response.json();
      // console.log(result.animals, "result.aninals")
      setAnimals(result.animals);
    } catch (err) {
      console.log(err);
    }
  };
  //useEffect runs on iniital render, getToken gets the token and getAnimals makes fetch to petFinderApi,
  //reset animal type and zip from the initial value
  useEffect(() => {

    getAnimals();
    setAnimalType("");
    setZipCode("");
    // console.log(zipCode, animalType, animals);
    // console.log("use efect on frist load");
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
        <input type="number" value={zipCode} placeholder={"enter your zip code"} onChange={zipCodeHandler} />

        <input type="submit" />
      </form>
      <AnimalResultLayout animals={animals} />
    </>
  );
}
