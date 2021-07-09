const router = require('express').Router();
const Workout = require("./workoutModel.js");


router.post("/excercise", async ({body}, res) => {
    try{
        const workoutData = await Workout.create(body)
        res.status(200).json(workoutData);
    }catch (err){
        res.status(400).json(err);
    }
});

 
 //app.get("/stats")
 
 //app.get("/excercise?") (continue workout)
 
 //app.get("excercise") (new workout)
 
 



module.exports = router;
