// this file is so that we can use the context we created by invoking hooks
import {useContext} from 'react';
import {WorkoutsContext} from '../context/WorkoutContext'


// this hook returns to us the value of the WorkoutsContext which is the value we passed into the provider component
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if(!context) { // if the provider has not been wrapped around a file we are using the context in, the the context will not have a value
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }

    return context // we return the context which contains the state and dispatch values
}