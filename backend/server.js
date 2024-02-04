require('dotenv').config() // require the dotenv package so we can use the process object to access our .env file with our hidden variables

const express = require('express') // requiring the express package to be used in the code
const workoutRoutes = require('./routes/workouts') // imports the routes from our workouts.js file 

const app = express() // express app being stored in app constant

//----------- middleware (any code that executes between us getting a request on the server and us sending a response) ------//
// the next object has to run in the middleware in order to move on to the next piece of middleware

// any request that comes in, the express.json() function looks if it has any body/data to the request and if it does, it passes it to the req object so we can access it
app.use(express.json()) 

app.use((req, res, next) => {
    console.log(req.path, req.method) // this is logging the path from where the reqest is coming from and what method it is using e.g GET, POST, DELETE
    next()
})

// uses the routes we imported on the app
app.use('/api/workouts', workoutRoutes) // when a request is fired to the /api/workouts path then we invoke any route. This path is just a normal '/' inside the workouts.js file

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})

