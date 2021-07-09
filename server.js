const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true  });

//call first page (link for Fitness Tracker on Nav) > WORK
app.get("/", (req, res) => {
    res.send(index.html);
  });

  //create new workout > WORK
  app.post("/exercise", ({ body }, res) => {
      db.Workout.create(body)
      .then(newWorkout => {
        res.json(newWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });



//create new workout > WORK
// app.post("/excercise", async ({ body }, res) => {
//     try {
//        const workoutDT = await Workout.create(body)
//         res.status(200).json(workoutDT);
// }catch(err) {
//         res.status(400).json(err);
//     }
// });


// app.get("/excercise?", async ({ body }, res) => {
//     try {
//         const prevWorkout = await Workout.findOneAndUpdate({})
//     }
// })



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });