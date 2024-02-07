// we have the GET all workouts in home so that the home page shows all the workouts

import React, { useEffect } from 'react'; // importing react and some functions
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext() // we are making the ...state as workouts since the state is a collection of workouts

    // we want to list all the workouts on the home page
    useEffect(() => { 

        // we want this to be asynchronous so that we dont have to wait for things to happen
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') // we are fetching the data from our backend host. This data will be an array since we can have multiple workouts
            const json = await response.json() // we pass the json from the response instantly into a json constant so we can work with it. This json holds objects which are each a workout

            if (response.ok) { // we are checking if the response is ok incase we got an error and didn't get the data back. If this statement doesn't go through, then our workouts are null
                dispatch({type: 'SET_WORKOUTS', payload: json}) // we are setting our payload as the json which contains all our workouts and this will be set in the state
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
            <WorkoutForm/>
        </div>
    )
}

export default Home