import React, { useEffect, useState } from 'react'; // importing react and some functions

//components
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {
    const[workouts, setWorkouts] = useState(null) // the local array workouts can be set through setWorkouts

    useEffect(() => { // we want to list all the workouts on the home page

        // we want this to be asynchronous so that we dont have to wait for things to happen
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') // we are fetching the data from our backend host. This data will be an array since we can have multiple workouts
            const json = await response.json() // we pass the json from the response instantly into a json constant so we can work with it. This json holds objects which are each a workout

            if (response.ok) { // we are checking if the response is ok incase we got an error and didn't get the data back. If this statement doesn't go through, then our workouts are null
                setWorkouts(json) // we are storing the json in the workouts array
            }
        }

        fetchWorkouts()
    }, []) // we have an empty array as the second argument so that when all the componenets render it only renders once

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => ( // if workouts isn't null then it will map through each workout that we have from our fetch above
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
        </div>
    )
}

export default Home