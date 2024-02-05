const express = require('express')
const Workout = require('../models/workoutModel') // importing our Workout model

const router = express.Router() // creates an instance of the router

// routers are request handlers and are used to respond to a request. We use different routes for different requests
// '/' is local host port 5000/ so the room domain
// req is the request object which has information about the request
// res is the response object that sends a response back to the user

// GET all workouts
router.get('/', (req, res) => { 
    res.json({mssg: 'GET all workouts'}) // sends back a json string
})

// GET a single workout
router.get('/:id', (req, res) => { // id of what we want to specifically get
    res.json({mssg: 'GET a single workout'})
})

// POST a new workout
// we want this to be asynchronous so the workout constant can response instantly to a Workout being created and not have to wait for any other code to fire
router.post('/', async (req, res) => {
    const {title, load, reps} = req.body // we are making the body of our request be limited to title, load, reps. So that when data is sent through the req object, it only takes those

    try {
        const workout = await Workout.create({title, load, reps}) // we are creating a Workout from our model and then storing it into the workout constant
        res.status(200).json(workout) // status 200 means good. The json we are sending back is the workout object/document
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE a workout
router.delete('/:id', (req, res) => { // id of what we want to specifically delete
    res.json({mssg: 'DELETE a workout'})
})

// UPDATE a new workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
})

module.exports = router // exports the routers so it can be used in the server.js file