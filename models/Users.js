const { Schema, model } = require("mongoose");
//the Schema is a format for how data will be stored in our database. The schema helps us to use dynamically with our database. 
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  
  },
  {
    timestamps: true,
  }
);

//export the model
const User = model("User", UserSchema);

module.exports = User;