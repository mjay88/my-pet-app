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

//Blind Spots
//    "/.new" ?
router.post("/", requiresAuth, async (req, res) => {
 try{
   //get the user id from current user (the user doing the liking)
   req.body['user'] = req.user._id;
   //create a favorite based off of our favorite model
   const createdFavorite = await Favorite.create(req.body);

   res.status(200).json({
     success: true,
     data: createdFavorite,
   })
  } catch (err) {
    console.log(err);

    return res.status(500).send(err.message);
  }

const newFavorite = await new Favorite( req.body );
newFavorite.save(function (err) {
  if (err) return handleError(err);
  // saved!
});










});

//@route Get/api/favorites/current
//@desc return current users favorites
//@access private
// petName
// :
// "Wookie (Benefactor Dog)"
router.get("/current", requiresAuth, async (req, res) => {
  try {
    //get user by id
    const Favorites = await Favorite.findOne({
      petName: "Wookie (Benefactor Dog)"
    });
    return res.json({ favorites: Favorites });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
