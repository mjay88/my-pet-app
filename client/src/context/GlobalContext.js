import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";

let key = "ssg62RKnSfXN0CwnanhRQRMwwwZTvuGnt8BE3th4ujwGKi3Dc4";
let secret = "xCknCe8Vbez42FlMgPWdK95ngdg5G0lIMXSLB9FB";

/*For Basit: Globalcontext should be retreiving current users favorites...correct? If not how do we do that?

We save our favorites to the database from the liked button on AnimalCard, should we be saving it from GlobalContext like example?

Still not rendering animals first time we go to search?

Why is password hashing not happening? 
7/6
Get rid of array in model

create favorites array in context

getCurrentUser returns user and favorites

populate favorites array (I guess it could be an object) through dispatch method, see example line 114

where do we find favorites by user id?

render favorites

look up actions in context, see addToDo and ToDoComplete in example




*/

//in context we are going to create the reduceer and we are going to pass down the animals from our api call
//when using context globally we always need to start with defining our initial state

const initialState = {
  user: null,
  token: null,
  fetchingUser: true,
  //what's saved in our data base
  userFavorites: [],
  //from our database
 
  renderFavorites: [],
};

//reducer, the reducer is how we will control state based on certain cases, reducer has nothing to do with database
const globalReducer = (state, action) => {
  switch (action.type) {
    //if getCurrent finds a user, we define state with that users returned data
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
      };
    case "SET_FAVORITES":
      return {
        ...state,
        userFavorites: action.payload,
      };
    //reset the state if no user data is found from getCurrentUser
    case "RESET_USER":
      return {
        ...state,
        user: null,
        userFavorites: [],
        fetchingUser: false,
      };
    //i guess we don't need this here because we are using localstorage? localstorage is kind of like context i guess, we can access it anywhere from front end very easy?
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
      
      case "GET_RENDER_FAVORITES" : 
      return {
        ...state,
        renderFavorites: action.payload,
      }
    
      case "REMOVE_FAVORITE":
        return {
          ...state,
          userFavorites: action.payload,
        };
    default:
      return state;
  }
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = (props) => {
  //the reducer acts as the function reduce, but instead of returning a single value, can reduce and return multiple variable values at the same time/an object
  const [state, dispatch] = useReducer(globalReducer, initialState);
   
  //useEffect is a hook that we are using as a life cycle method here,
  //the second parameter is what we want to listen to changes for, when we leave it as an empty array this useEffect will run everytime the component ?finishes? mounting, everytime we reload or refresh
  useEffect(() => {
    //on the mount/intial load run getCurrentUser() and get our data from the server if its there, since we set up an access token with a cookie, to check if someone is logged in we check for that cookie, they don't have to login everytime it refreshes
    //should probably retrieve token first?, incase we add to getCurrent user later
    getToken();
   //provides us with our current user and that users favorites ids pull from our database
    getCurrentUser();
    
  }, []);
 
  //action: get current user
  const getCurrentUser = async () => {
    //should I just add getPetIds logic from favoritesLayout here?
    //request to our backend
    try {
      const res = await axios.get("/api/auth/current");
      //if data is returned, (if a user is logged in) it will be on the response
      // console.log(res.data, "inside getCurrentUser on globalContext");
      if (res.data) {
        //if there is a user logged in make another request to get that users favorites ids from the database, then we have to make another call to pet finder for the most current version of those pets
        const favoritesRes = await axios.get("/api/favorites/current");
        // console.log(favoritesRes.data, "favoriteRes.data 115 context");
        if (favoritesRes.data) {
          console.log(favoritesRes.data, "favResponse from context")
          //dispatch is going to talk to our reducer, type in the reducer uses all capital letters and underscore for spaces, and payload is the data we are going to use. dispatch=do this in the reducer(managing state). dispatch is just a function specific to our reducer and state making it much easier to manage state, within context actions are also functions that tell us how to comunicate with the backend. Actions are complex functions, dispatch are simple ones just for dealing with state
          //set the user if there is data returned from api call
          dispatch({ type: "SET_USER", payload: res.data });
          //setting favorites in state equal to what they are in the database for current user
          dispatch({
            type: "SET_FAVORITES",
            //just getting the Id from database
            payload: await favoritesRes.data.map((pet) => {
              return pet
            }),
          });
          dispatch({
            type: "USER_FAVORITE_IDS",
            //just getting the Id from database
            payload: await favoritesRes.data.map((pet) => {
              return pet.petId
            }),
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
  //action for getting token

  //function for retrieving token, convert to axios with Kayvon

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
    // console.log(authToken, "inside context for fucks sake line 153");
    localStorage.setItem("token", authToken.access_token);
  };



 
//add getPets here, which makes get call to petfinder based on the pets in our database

const getPets = async (arrayOfIds) => {

  

   const response = await Promise.all(
      
      arrayOfIds.map(async (id) => {
        try {
          const response = axios.get(
            `https://api.petfinder.com/v2/animals/` + id,

            {
              method: "GET",
              // mode: "no-cors",

              headers: {
                "Content-Type": "application/json",

                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          const data = await response;
          console.log(data, "data from inside getPets");
          return data;
        } catch (err) {
          console.log(err.response, "err.response from inside getPets"); // this is the main part. Use the response property from the error object

          return err.response;
        }
      })
    
  );
  console.log(response, "response from inside getpets in context")
  if(response){
    dispatch({type: "GET_RENDER_FAVORITES", payload: response})
  }
};




  //dispatches

  const logout = async () => {
    try {
      await axios.put("/api/auth/logout");

      dispatch({ type: "RESET_USER" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "RESET_USER" });
    }
  };
//why do I need this if I am already pulling the animal ids from the data base 
  const addFav = (animal) => {
    dispatch({
      type: "SET_FAVORITES",
      //this is just an array of ids 
      payload: [animal, ...state.userFavorites],
    });
  };

  //add remove
  const removeFav = (id) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: state.userFavorites.filter((idToRemove) => 
         idToRemove.id !== id    
     )
    })
  }
 



  const value = {
    ...state,
    getCurrentUser,
    addFav,
    logout,
    getToken,
    removeFav,
    // renderFavs,
    // setRenderFavs,
  };
  console.log(value, 'value from context')
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






