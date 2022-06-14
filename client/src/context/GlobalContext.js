import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
//in context we are going to create the reduceer and we are going to pass down the animals from our api call
//when using context globally we always need to start with defining our initial state

const initialState = {
  user: null,
  fetchingUser: true,
  userFavorites: [],
};

//reducer, the reducer is how we will control state based on certain cases
const globalReducer = (state, action) => {
  switch (action.type) {
    //if getCurrent user finds a user, we will set state with that data
    case "SET_USER":
      return {
        ...state,
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
  

  //useEffect is a hook that we are using as a life cycle method here,
  //the second parameter is what we want to listen to changes for, when we leave it as an empty array this useEffect will run everytime the component mounts, everytime we reload or refresh
  useEffect(() => {
    //on the mount/intial load run getCurrentUser() and get our data from the server if its there
    getCurrentUser();
  }, []);

  //action: get current user
  const getCurrentUser = async () => {
    //request to our backend
    try {
      const res = await axios.get("/api/auth/current");
      //if data is returned it will be on the response
      if (res.data) {
        //if there is a user logged in make another request to get that users favorites
        const favorites = await axios.get("/api/favorites/current");
        if (favorites.data) {
          //dispatch is going to talk to our reducer, type in the reducer uses all capital letters and underscore for spaces, and payload is the data we are going to use. dispatch=do this in the reducer(managing state). dispatch is just a function specific to our reducer and state making it much easier to manage state, within context actions are also functions that tell us how to comunicate with the backend. Actions are complex functions, dispatch are simple ones just for dealing with state
          dispatch({ type: "SET_USER", payload: res.data });
          //setting complete todos in our app equal to what they are in the database
          dispatch({
            type: "SET_FAVORITES",
            payload:favorites
          });
       
        }
        //if no data is found dispatch this type, no payload because no data
      } else {
        dispatch({ type: "RESET_USER" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "RESET_USER" });
    }
  };

  const value = {
    ...state,
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
