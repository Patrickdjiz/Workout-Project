require('dotenv').config() // require the dotenv package so we can use the process object to access our .env file with our hidden variables

const express = require('express') // requiring the express package to be used in the code
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts') // imports the routes from our workouts.js file 

const app = express() // express app being stored in app constant

//----------- middleware (any code that executes between us getting a request on the server and us sending a response) ------//
// the next object has to run in the middleware in order to move on to the next piece of middleware

app.use((req, res, next) => {
    console.log(req.path, req.method) // this is logging the path from where the reqest is coming from and what method it is using e.g GET, POST, DELETE
    next()
})

// any request that comes in, the express.json() function looks if it has any body/data to the request and if it does, it passes it to the req object so we can access it
app.use(express.json()) 

// uses the routes we imported on the app
// when a request is fired to the /api/workouts path then we invoke any route. This path is just a normal '/' inside the workouts.js file
// because of express.json() that invoked route also carrys any data to the req object
app.use('/api/workouts', workoutRoutes) 

// connect to mongoDB and mongoose
// we do not want to listen to requests unless we are connected to our database so we do that inside here
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


