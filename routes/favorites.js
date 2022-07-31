const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const requiresAuth = require("../middleware/permissions");

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
  try {
    //get the user id from current user (the user doing the liking)
    req.body["user"] = req.user._id;
    //create a favorite based off of our favorite model
    // const createdFavorite = await Favorite.create(req.body);

    // res.status(200).json({
    //   success: true,
    //   data: createdFavorite,
    // });
  } catch (err) {
    console.log(err);

    return res.status(500).send(err.message);
  }

  const newFavorite = await new Favorite(req.body);
  newFavorite.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
});

router.get("/current", requiresAuth, async (req, res) => {
  try {
    Favorite.find({ user: req.user._id })
      //return entire model
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});


//fuck this
//@route delete /api/favorite/:favId
//@desc delete a liked animal
//@access private



router.delete("/:favId", requiresAuth, async (req, res) => {

  try{
    //fetch the favorite to make sure it exists 
  const fav = await Favorite.findOne({
    //it belongs to our current user
    user:req.user._id,
    //params is _id
    _id: req.params.favId,
  });
  //if no favorite
  if(!fav){
    return res.status(404).json({error: "Could not find this animal"});
  }
  //if we find the favorite delete it
  await Favorite.findOneAndRemove({
    //first parameter is the same as above, the query were making
    user: req.user._id,
    _id: req.params.favId,
  });
  return res.json({success: true})
 }catch(err){
  console.log(err);
  return res.status(500).send(err.message);
 }
})


router.delete("/", requiresAuth, async (req, res) => {
  console.log(req.body.animalId)

  Favorite
    .deleteOne({ "petId": req.body.animalId, "user":req.user._id })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})



module.exports = router;
