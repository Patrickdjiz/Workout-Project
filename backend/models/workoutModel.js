const mongoose = require('mongoose') // we need to require mongoose so we can create schemas

const Schema = mongoose.Schema

// schema that follows a set structure for all our data. If we save a document missing any of this information or it is not with the correct value, it will not be saved.
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true}) // when a document is created or updated, it will save that timestamp


// we are creating a model, naming it Workout, based off our workoutSchema so that it can be exported 
module.exports = mongoose.model('Workout', workoutSchema)