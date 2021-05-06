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
            required: "Enter exercise type"
        },
        name: {
            type: String,
            trim: true,
            required: "Enter exercise name"
        },
        duration: {
            type: Number,
            required: "Enter minutes of exercise"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }],

},
{
    toJSON: { 
        virtuals:true,
    },
}
);

WorkoutSchema.virtual("totalDuration").get(function () {
    let totalDuration = this.exercises.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.duration;
    }, 0);

    return totalDuration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;