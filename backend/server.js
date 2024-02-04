require('dotenv').config() // require the dotenv package so we can use the process object to access our .env file with our hidden variables

const express = require('express') // requiring the express package to be used in the code

const app = express() // express app being stored in app constant

// middleware (any code that executes between us getting a request on the server and us sending a response)
// the next object has to run in the middleware in order to move on to the next piece of middleware
app.use((req, res, next) => {
    console.log(req.path, req.method) // this is logging the path from where the reqest is coming from and what method it is using e.g GET, POST, DELETE
    next()
})

//------- routes ------//
// '/' is local host port 5000/ so the room domain
// req is the request object which has information about the request
// res is the response object that sends a response back to the user
app.get('/', (req, res) => { 
    res.json({mssg: 'Welcome to the app'}) // sends back a json string
})


// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})

