// Dependencies
const express = require("express");
const logger = require("morgan"); // logs all request to the console
const mongoose = require("mongoose");


// Sets up Express App
const PORT = process.env.PORT || 3000;

const app = express();

const db = require("./models");
const path = require("path");


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
    Workout.create(body)
    .then(newWorkout => {
      res.json(newWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Read last workout > WORK
app.get("/api/workouts", (req, res) => {
  console.log("Reading workout")
  Workout.find({})
    .then(WorkoutDT => {
      res.json(WorkoutDT);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// Add an exercise - 
app.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: {exercises: req.body}},
    { new: true}
  )
    .then(WorkoutDT => {
      res.json(WorkoutDT);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})




// Server starts listening 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });