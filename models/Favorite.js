const { Schema, model, default: mongoose } = require("mongoose");

//favorites schema
const FavoritesSchema = new Schema(
  {
    //user is another schema and we want the users objectID (current user)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    favorites: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = model("animal", AnimalSchema);
module.exports = model("Favorite", FavoritesSchema);
