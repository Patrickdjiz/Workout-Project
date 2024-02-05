const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workoutController') // importing the functions from the workoutController so we can mount the routes

const router = express.Router() // creates an instance of the router

// routers are request handlers and are used to respond to a request. We use different routes for different requests
// '/' is local host port 5000/ so the room domain

// GET all workouts using function from controller
router.get('/', getWorkouts)

// GET a single workout using function from controller
router.get('/:id', getWorkout) // id of what we want to specifically get

// POST a new workout using function from controller
router.post('/', createWorkout)

// DELETE a workout using function from controller
router.delete('/:id', deleteWorkout) // id of what we want to specifically delete

// UPDATE a new workout using function from controller
router.patch('/:id', updateWorkout)

module.exports = router // exports the routers so it can be used in the server.js file