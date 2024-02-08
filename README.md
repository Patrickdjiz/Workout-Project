# Workout-Project
This project uses Mongodb, Express, React and Node.js (MERN) to create a workout planner that allows a user to create, delete and see their workouts on a webpage. 
The react application runs in the browser in the frontend to power the website and handles routing in the browser.
To show data in the website, we send a request from the frontend to the backend.
The backend is an express app running in a node.js environment. Express is a framework for node that lets allows for the creation of API's
The node and express API handles requests on the backend and interacts with the mongoDB
Once the backend has the data from the database, it sends a response back to the browser which then the react app handles that response by outputting the data in a template