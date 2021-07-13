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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//send file to render on browser

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});



//create new workout > WORK
app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// Read last workout > WORK
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(WorkoutDT => {
            res.json(WorkoutDT);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


//  Add (update) an exercise - WORK
app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
        {_id: req.params.id},
        { $push: { exercises: req.body },
     },
        { new: true })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//in range
app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {$addFields: {totalDuration: {  $sum: "$exercises.duration"}
        }
      }])
    .limit(7)
    .then(newWorkout => {
      res.json(newWorkout);
    }).catch(err => {
      res.status(400).json(err);
    });
  });
  
  app.delete("/api/workouts/:id", (req, res) =>{
    db.Workout.findByIdAndDelete( req.params.id)
    .then(deletedWorkout => {
      res.json(deletedWorkout);
    }).catch(err => {
      res.json(err);
    });
  });


// Server starts listening 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});