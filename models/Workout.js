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
    duration: {
        type: Number,
        trim: true,
        require: "Duration is required"
    },
    weight: {
        type: Number
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
    }
});


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
