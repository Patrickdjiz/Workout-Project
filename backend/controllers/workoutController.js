// this file will have a bunch of functions that we can reference in the router file so that our routers do not become bloated with code

const Workout = require('../models/workoutModel') // importing our Workout model which has the workout schema
const mongoose = require('mongoose')

// req is the request object which has information about the request
// res is the response object that sends a response back to the user

// Get all workouts
const getWorkouts = async (req, res) => {
    // we are finding all the workouts so its an empty curly brackets as no workout is specified which then creates an array
    // we sort it at createdAt -1 so that it is in decsending order with the newest ones at the top
    const workouts = await Workout.find({}).sort({createdAt: -1}) 

    res.status(200).json(workouts) // send back all the workouts
}

// Get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params // we need the id of the workout we are trying to find and the route paramaters store this id which will be passed when the route fires this function

    if(!mongoose.Types.ObjectId.isValid(id)) { // this method checks if the id is not a valid id type e.g Strings
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout) { // this method checks if the id is not found
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout) // sending back the workout
}

// Create a new workout
// we want this to be asynchronous so the workout constant can response instantly to a Workout being created and not have to wait for any other code to fire
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body // we are making the body of our request be limited to title, load, reps. So that when data is sent through the req object, it only takes those

    // adds document to database
    try {
        const workout = await Workout.create({title, load, reps}) // we are creating a Workout from our model and then storing it into the workout constant
        res.status(200).json(workout) // status 200 means good. The json we are sending back is the workout object/document
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a workout
const deleteWorkout = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) { // this method checks if the id is not a valid id type e.g Strings
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id}) // this deletes the workout based on id

    if(!workout) { // this method checks if the id is not found
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout) // sends the workout we just deleted
}

// Update a workout
const updateWorkout = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) { // this method checks if the id is not a valid id type e.g Strings
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        // the properties we want to update for the workout are in the req object and the req.body looks for the properties. 
        // The ... spreads the object properties into the object we identified with the id
        ...req.body
    })

    if(!workout) { // this method checks if the id is not found
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}