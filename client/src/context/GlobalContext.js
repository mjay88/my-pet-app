import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

/*For Basit: Globalcontext should be retreiving current users favorites...correct? If not how do we do that?

We save our favorites to the database from the liked button on AnimalCard, should we be saving it from GlobalContext like example?

Still not rendering animals first time we go to search?

Why is password hashing not happening? 





*/

//in context we are going to create the reduceer and we are going to pass down the animals from our api call
//when using context globally we always need to start with defining our initial state

const initialState = {
  user: null,
  fetchingUser: true,
  userFavorites: [],
};

//reducer, the reducer is how we will control state based on certain cases, reducer has nothing to do with database
const globalReducer = (state, action) => {
  switch (action.type) {
    //if getCurrent finds a user, we define state with that users returned data
    case "SET_USER":
      return {
        ...state,
        //payload is set on line 67
        user: action.payload,
        fetchingUser: false,
      };
    case "SET_FAVORITES":
      return {
        ...state,
        setFavorites: action.payload,
      };
    //reset the state if no user data is found from getCurrentUser
    case "RESET_USER":
      return {
        ...state,
        user: null,
        setFavorites: [],
        fetchingUser: false,
      };
    default:
      return state;
  }
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const [animals, setAnimals] = useState("");

  //useEffect is a hook that we are using as a life cycle method here,
  //the second parameter is what we want to listen to changes for, when we leave it as an empty array this useEffect will run everytime the component ?finishes? mounting, everytime we reload or refresh
  useEffect(() => {
    //on the mount/intial load run getCurrentUser() and get our data from the server if its there, since we set up an access token with a cookie, to check if someone is logged in we check for that cookie, they don't have to login everytime it refreshes
    getCurrentUser();
  }, []);

  //action: get current user
  const getCurrentUser = async () => {
    //request to our backend
    try {
      const res = await axios.get("/api/auth/current");
      //if data is returned, (if a user is logged in) it will be on the response
      console.log(res.data, 'inside getCurrentUser on globalContext')
      if (res.data) {
        //if there is a user logged in make another request to get that users favorites and update state with them
        const favoritesRes = await axios.get("/api/favorites/current");
        console.log(favoritesRes.data, "favoriteRes.data")
        if (favoritesRes.data) {
          //dispatch is going to talk to our reducer, type in the reducer uses all capital letters and underscore for spaces, and payload is the data we are going to use. dispatch=do this in the reducer(managing state). dispatch is just a function specific to our reducer and state making it much easier to manage state, within context actions are also functions that tell us how to comunicate with the backend. Actions are complex functions, dispatch are simple ones just for dealing with state
          //set the user if there is data returned from api call
          dispatch({ type: "SET_USER", payload: res.data });
          //setting favorites in state equal to what they are in the database for current user
          dispatch({
            type: "SET_FAVORITES",
            payload:favoritesRes.data
          });
       
        }
        //if no data is found dispatch this type, no payload because no data, set state back to initial state
      } else {
        dispatch({ type: "RESET_USER" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "RESET_USER" });
    }
  };

  
  const logout = async () => {
    try {
      await axios.put("/api/auth/logout");

      dispatch({ type: "RESET_USER" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "RESET_USER" });
    }
  };

  const value = {
    ...state,
    getCurrentUser,
    logout,
    animals,
    setAnimals
  };
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

//exporting globalcontext by creating our own hook
export function useGlobalContext() {
  return useContext(GlobalContext);
}
