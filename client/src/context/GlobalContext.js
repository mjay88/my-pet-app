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
  //relabel userFavoritesIds to userFavoritesIdsIds
  userFavoritesIds: [],
  userFavoritesIdsReturnFromPetFinder: [],
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
      //this saves animal to our database
    case "SET_FAVORITES":
      return {
        ...state,
        userFavoritesIds: action.payload,
      };
    //reset the state if no user data is found from getCurrentUser
    case "RESET_USER":
      return {
        ...state,
        user: null,
        userFavoritesIds: [],
        fetchingUser: false,
      };
    //i guess we don't need this here because we are using localstorage? localstorage is kind of like context i guess, we can access it anywhere from front end very easy?
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "GET_FAVORITES":
      return {
        ...state,
        userFavoritesIdsReturnFromPetFinder: action.payload,
      };
    default:
      return state;
  }
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = (props) => {
  //the reducer acts as the function reduce, but instead of returning a single value, can reduce and return multiple variable values at the same time?
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
      console.log(res.data, "inside getCurrentUser on globalContext");
      if (res.data) {
        //if there is a user logged in make another request to get that users favorites ids from the database, then we have to make another call to pet finder for the most current version of those pets
        const favoritesRes = await axios.get("/api/favorites/current");
        console.log(favoritesRes.data, "favoriteRes.data 115 context");
        if (favoritesRes.data) {
          //dispatch is going to talk to our reducer, type in the reducer uses all capital letters and underscore for spaces, and payload is the data we are going to use. dispatch=do this in the reducer(managing state). dispatch is just a function specific to our reducer and state making it much easier to manage state, within context actions are also functions that tell us how to comunicate with the backend. Actions are complex functions, dispatch are simple ones just for dealing with state
          //set the user if there is data returned from api call
          dispatch({ type: "SET_USER", payload: res.data });
          //setting favorites in state equal to what they are in the database for current user
          dispatch({
            type: "SET_FAVORITES",
            //just getting the Id from database
            payload: await favoritesRes.data.map((pet) => {
              return pet.petId;
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
    console.log(authToken, "inside context for fucks sake line 153");
    localStorage.setItem("token", authToken.access_token);
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

  const addFav = (animal) => {
    dispatch({
      type: "SET_FAVORITES",
      //this is just an array of ids now remember
      payload: [animal, ...state.userFavoritesIds],
    });
  };
//sets userFavoritesIdsReturnFromPetFinder
  // const getFavsFromPetFinder = async (arrayOfIds) => {
  //   try {
    //       arrayOfIds.map((id, idx) => {
  //    const res = await axios.get(
        //       `https://api.petfinder.com/v2/animals/56266800`,
        //       {
        //         headers: {
        //           "Content-Type": "application/json",
        //           Authorization: "Bearer " + localStorage.getItem("token"),
        //         },
        //       }
        //     );

    // })
  //    
  //     //need to look at how the returned data is structured
  //     if(res.data){
  //       console.log(res.data, "response from petfinder")
  //       dispatch({
  //         type: "GET_FAVORITES",
  //         payload: res.data,
  //       })
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getFavsFromPetFinder = async (arrayOfIds) => {
  //   return async function(){
  //     return  Promise.all(arrayOfIds.map((fav, index) => {
  //       return axios.get(`https://api.petfinder.com/v2/animals/` + fav);
  //     })).then(response => {
  //          setRenderFavs(response)
  //     })
  //   }
  // }
  const value = {
    ...state,
    getCurrentUser,
    addFav,
    logout,
    getToken,
    // getFavsFromPetFinder,

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






