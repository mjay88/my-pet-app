require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//init express
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//import routes
const authRoute = require("./routes/auth");
const favoritesRoute = require("./routes/favorites")


app.get("/api", (req, res) => {
    res.send("Working")
  });
  
  app.post("/name", (req, res) => {
    if(req.body.name) {
      return res.json({name: req.body.name});
        } else {
          return res.status(400).json({error: "No name provided"});
        };
  })

  app.use("/api/auth", authRoute);
  app.use("/api/favorites", favoritesRoute);










//connect to database
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database")
   
   
  app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${Number(process.env.PORT)}`);
  });
  }).catch((error) => {
    console.log(error);
  })
  