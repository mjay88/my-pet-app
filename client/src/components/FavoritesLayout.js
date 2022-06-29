import React from "react";
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import AnimalCard from "./AnimalCard";
//review my GlobalContext with Basit, this may be were my password hashing is getting fucked up, and I should be retrieving favorites from there?, but we save to the data base in Search.js not GlobalContextl like example




const FavoritesLayout = () => {
const {userFavorites} = useGlobalContext;
//api call to database for favorites of current user?
const getFavorites = async () => {
    const response = await fetch(`http://localhost:5000/api/favorites/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success === true) {
        console.log(result);
      }

  };


useEffect(() => {
    getFavorites();
}, [])




return (
    //this works because of getCurrent user in global context
    <div className='animal-results'>


        {/* {userFavorites.length > 0 &&
            userFavorites.animals.map((animal) => {
                return <AnimalCard key={animal.id} animal={animal} />;
            })} */}
    </div>
);

}

export default FavoritesLayout;

