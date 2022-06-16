import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AnimalResultLayout from "./AnimalResultLayout";
import AnimalCard from "./AnimalCard";
import "../App.scss";
import { useGlobalContext } from "../context/GlobalContext";


let key = "ssg62RKnSfXN0CwnanhRQRMwwwZTvuGnt8BE3th4ujwGKi3Dc4";
let secret = "xCknCe8Vbez42FlMgPWdK95ngdg5G0lIMXSLB9FB";

export default function Search() {
  const [token, setToken] = React.useState("");
  //animals will be an array, should this even be in state?
  //animals is passed to search from context, and animals changes from search component every time user clicks search
  const {animals, setAnimals} = useGlobalContext();
  //get this from the search form
  const [zipCode, setZipCode] = React.useState(70130);
  //set state to something so our animal array renders on render.
  const [animalType, setAnimalType] = React.useState("dog");

  //from react hook form
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    //reset animals in state to empty for new api call?

    //set state from form data
    setZipCode(data.zipCode);
    setAnimalType(data.type);
    getAnimals();
    // getAnimals();
    reset();
  };

  //function for retrieving token
  const getToken = async () => {
    //where to add params??
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

  //api call for getting animals from search form params

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
    setAnimalType("dog");
    setZipCode(70130)
    getAnimals();

    console.log(zipCode, animalType, animals);
    console.log("use efect on frist load");
  }, []);

  console.log(token, "token", animals, 'animals');

  return (
    <>
      {/**is this appropiate jsx? */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("type")}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <input type="number" {...register("zipCode")} />

        <input type="submit" />
      </form>
      <AnimalResultLayout animals={animals} />
    </>
  );
}
