require("dotenv").config();
const express = require("express");

//init express
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


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

















  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${Number(process.env.PORT)}`);
});  