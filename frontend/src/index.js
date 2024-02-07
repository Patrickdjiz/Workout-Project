import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext'

// we are wrapping our entire app around the WorkoutsContextProvider so the entire application has access to the context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider> 
      <App /> 
    </WorkoutsContextProvider>
  </React.StrictMode>
);

