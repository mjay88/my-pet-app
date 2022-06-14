const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
// const Animals = require("../models/Favorites");
const requiresAuth = require("../middleware/permissions");
const res = require("express/lib/response");
const db = require("mongoose");
const createApplication = require("express/lib/express");
//import permissions to remove password from response

//need to/how to add validation for favorite?

//@route Get/api/favorites/test
//@desc test the tools reoute
//@access Public
router.get("/test", (req, res) => {
  res.send("Favorites route working");
});

//@route post/api/favorites/new
//@desc Create a new favorite
//@access private

router.post("/new", requiresAuth, async (req, res) => {
  //destructure objects from postman ex.
 try{
   //create new favorite
   const newFavorite = new Favorite({
       //attaches a user id to each new todo, when we look up current users todos, we search through all the todos in database and pull the ones with our users id
       user: req.user._id,
       favorite: req.body

   })
 //push new favorite into users favorite array, how to get current logged in user though
    user.favorites.push(newFavorite)
    await user.save();

    return res.json(newFavorite);
  } catch (err) {
    console.log(err);

    return res.status(500).send(err.message);
  }
});

//@route Get/api/favorites/current
//@desc return current users favorites
//@access private

router.get("/current", async (req, res) => {
  try {
    //get user by id
    const Favorites = await Favorite.find({
      user: req.params.user,
    });
    return res.json({ favorites: Favorites });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
