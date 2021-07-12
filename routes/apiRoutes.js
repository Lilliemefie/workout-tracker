const app = require("express").Router();
const Workout = require("../models/Workout.js");


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

// Read last workout > WORK
app.get("/api/workouts", (req, res) => {
  console.log("Reading workout")
  db.Workout.find({})
    .then(WorkoutDT => {
      res.json(WorkoutDT);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// Add an exercise - 
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
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




module.exports = app;