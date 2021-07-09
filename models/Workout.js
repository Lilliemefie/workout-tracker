const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: "Type of workout is required"
    },
    name: {
        type: String,
        trim: true,
        required: "Name of workout is required"
    },
    distance: {
        type: Number,
        trim: true,
        require: "Distance is required"
    },
    duration: {
        type: Number,
        trim: true,
        require: "Duration is required"
    },
    weight: {
        type: Number,
        trim: true,
        require: "Weight is required"
    },
    reps: {
        type: Number,
        trim: true,
        require: "Reps is required"
    },
    sets: {
        type: Number,
        trim: true,
        require: "Sets is required"
    }
});


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
