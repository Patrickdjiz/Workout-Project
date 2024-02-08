// this file is for showing the workouts on the home page and also deleting a workout

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import React from 'react'; // importing react
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, { // the workout of the id we are fetching will be appended to the end of the path
            method: 'DELETE'
        })
        const json = await response.json() // when we delete a response our json sends back the workout and here we are storing it in a variable json

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    
    // we imported the material symbols outlined from google apis in the index.html file
    return (
        <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span> 
        </div>
    )
}

export default WorkoutDetails