// Dependencies
const express = require("express");
const logger = require("morgan"); // logs all request to the console
const mongoose = require("mongoose");
const path = require("path");

// Sets up Express App
const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

// db Mongo
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true  });

//call first page (link for Fitness Tracker on Nav) > WORK
app.get("/", (req, res) => {
    res.send(index.html);
  });

  //create new workout > WORK
  app.post("/api/workouts", ({ body }, res) => {
      db.Workout.create(body)
      .then(newWorkout => {
        res.json(newWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

// Read last workout 
app.get("/api/workouts", (req, res) => {
    console.log("Reading workout")
    Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


// app.get("/excercise?", async ({ body }, res) => {
//     try {
//         const prevWorkout = await Workout.findOneAndUpdate({})
//     }
// })



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });