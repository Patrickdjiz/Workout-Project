const express = require('express')

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
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new workout'})
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