const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./workoutModel");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true, useUnifiedTopology: true  });


app.post("/excercise", ({body}, res) => {
   Workout.create(body)
   .then(dbWorkout => {
       res.json(dbWorkout);
   })
   .catch(err => {
       res.json(err);
   });
})

//app.get("/stats")

//app.get excercise? (continue workout)

//app.get("excercise") (new workout)



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });