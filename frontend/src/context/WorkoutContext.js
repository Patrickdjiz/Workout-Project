// This context file will update our workouts globally on the frontend which is being taken from the backend rather than doing the updates on a local file
// This keeps our UI in sync with the database and will also instantly update our home page when we create a workout

import React, { createContext, useReducer } from 'react'; // importing react

export const WorkoutsContext = createContext() // this creates us a new context

export const workoutsReducer = (state, action) => { // the state is going to be whatever is inside the useReducer function and the action is the two objects we pass in the dispatch function
    switch (action.type) {
        case 'SET_WORKOUTS': // if the action in our dispatch function is to set all the workouts then the payload of the dispatch function stores all those workouts to set
            return {
                workouts: action.payload // this is the workouts from our useReducer and we are setting the payload of the dispatch to that workouts
            }
        case 'CREATE_WORKOUT':
            return {
                // state has all the previous workouts in an array and we are spreading it and then adding the new workoout from the payload in the dispatch function to the top of that array
                workouts: [action.payload, ...state.workouts] 
            }
        default:
            return state
    }
}

// the WorkoutsContextProvider returns the actual provider of the context that we created above. 
// the children property represents whatever components the WorkoutsContextProvider has already wraped. Since we have wrapped the root app component in index.js then children is that app
export const WorkoutsContextProvider = ({children}) => {
    // the useReducer hook is like the useState function but the difference is that when we invoke the dispatch function to change the state, it also invokes the useReducer function 
    const [state, dispatch] = useReducer(workoutsReducer, { // we name the useReducer as workoutsReducer
        workouts: null
    }) 

    return (
        // The provider wraps the root app which means it wraps all components in our application, which means all components will have access to our WorkoutsContext
        // Whatever is inside the value will become available to our components. Here it is our state and dispatch objects which allow us to change the state of workouts through dispatch
        // we are spreading state as it may contain many workouts
        <WorkoutsContext.Provider value={{...state, dispatch}}> 
            { children }
        </WorkoutsContext.Provider>
    )
}

