// import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
// //from petfinder
// let key = "ssg62RKnSfXN0CwnanhRQRMwwwZTvuGnt8BE3th4ujwGKi3Dc4";
// let secret = "xCknCe8Vbez42FlMgPWdK95ngdg5G0lIMXSLB9FB";
// //useFetch function will first make a call to get token and add token to state
// //upon successfully getting the token it will make a call to get animals and save them to state

// //edge cases: using useEffect, watch depencey array


// const useCallbackRef = (callback) => {
//   const callbackRef = useRef(callback);
//   useLayoutEffect(() => {
//     callbackRef.current = callback;
//   }, [callback]);
//   return callbackRef;
// };



// export const useFetch = ({zipCode, animalType}) => {
//     //setting state from api calls
//   const [token, setToken] = useState(null);
//   const [animals, setAnimals] = useState(null);

// //intialize hook to hold reference of animals array
// const animalsRef = useRef(animals);

// //function for retrieving token
// const getToken = async () => {
//     //where to add params??
//     const params = new URLSearchParams();
//     params.append("grant_type", "client_credentials");
//     params.append("client_id", key);
//     params.append("client_secret", secret);

//     const token = await fetch("https://api.petfinder.com/v2/oauth2/token", {
//       method: "POST",
//       body: params,
//     });
//     //set await to variable so promise is handled
//     const authToken = await token.json();
//     // console.log(await token.json());
//     //set token using state
//     setToken(authToken.access_token);
//   };

//   //function for getting animals from search form params
  
//   const getAnimals = async (req, res) => {
//     try {
//       const animals = await fetch(
//         `https://api.petfinder.com/v2/animals?type`,
//         {
//           method: "GET",
//           //   mode: "no-cors",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       //is this how you use useRef? 
//       animalsRef.current?.(animals.json())
//       setAnimals(await animals.json());
//     } catch (err) {
//       console.log(err);
//     }
//   };
 

// //   const savedOnSuccess = useCallbackRef(options.onSuccess);

//   useEffect(() => {
//     getToken();
//   }, [token]);

//   return {
//     token,
//   };





// };