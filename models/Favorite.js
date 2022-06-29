const { Schema, model, default: mongoose } = require("mongoose");

//in mongoose, the schema is like defining a class and a model is like creating a instance of that class, you can add properties and methods to a schema similar to how you would an object. 

//favorites schema
//our favorites collection is going to except data from petfinders data base. 
//type is basically validation, default is require: false
const FavoritesSchema = new Schema(
  {
   petName: {
     type: String,
   },
   age: {
     type: String,
   },
   petId: {
     type: Number,
   },
   species: {
     type: String,
   },
   breed: {
     type: String,
   },
   createdAt:  {
       type: Date,
       default: Date.now,
   },
   //this is reference to our user model which already exists in the database
   user: {
     type: mongoose.Schema.ObjectId,
     ref: 'User',
     required: true,
   },
  }
);

// module.exports = model("animal", AnimalSchema);
module.exports = model("Favorite", FavoritesSchema);
