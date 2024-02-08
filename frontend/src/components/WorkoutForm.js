import React, { useState } from 'react'; // importing react
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()

    // these pieces of state will be used to set what the user types into the input fields in the form
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const[emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault() // normally on form submissions the page is refreshed so we are preventing that from happening

        const workout = {title, load, reps} // once a submission is made we already have set the title, load, and reps which we need

        const response = await fetch('/api/workouts', { // we are creating a post request for this form so we go into the workouts path
            method: 'POST',
            body: JSON.stringify(workout), // we need to pass the already created workout for the POST request but we need to change it to a JSON string. This is the body of the request
            headers: {
                'content-Type': 'application/json' // we are making the content type json
            }
        }) 
        const json = await response.json() // when we create a workout our workoutController will either send back the workout or an error message. Therefore, the json variable holds the workout

        if(!response.ok) { 
            setError(json.error) // if the response was not okay then our json will return the error property 
            setEmptyFields(json.emptyFields) // we are taking whatever emptyFields we are taking from our backend
        }
        if(response.ok) {
            // setting the properties back to nothing
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([]) // setting the emptyFields back to an empty array
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json}) // the json variable holds the workout so we are sending that back as our payload when we create a workout
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)} // we have the event e when someone types into the form and that sets the title to that 
                value={title} // this ensures that if we change the title back to nothing to reset the form, that change will be reflected in here
                className={emptyFields.includes('title') ? 'error' : ''} // if the title is in the emptyFields then we send back an error string but if it isn't we send back nothing
            /> 

            <label>Load (Kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button> 
            {error && <div className="error">{error}</div>}
        </form> // The button is to submit their created workout
    )
}

export default WorkoutForm