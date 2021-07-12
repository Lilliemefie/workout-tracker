const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },

    exercises: [{
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
        require: "Sets is required"}
}],

    {
  // adds a virtual property, not stored in Mongo, to compute properties on documents 
  toJSON: {
  virtuals: true,
  },
});


// WorkoutSchema.methods.lastUpdatedDate = function() {
//     this.lastUpdated = Date.now();
  
//     return this.lastUpdated;
//   };
  


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;




