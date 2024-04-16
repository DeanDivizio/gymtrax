"use client"
import React, {useEffect, useState} from 'react';

const NewWorkoutScreen = (routine, previousWorkout, workout) => {

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
}

    return (
        <div>
        <h2><em>Get After It</em></h2>
        <h3>Upper Body</h3>
        <form>
            <div>
                <label>exerciseName 3x5:</label>
                <input type="text" 
                placeholder='65'/>
            </div>
            <div>
                <label>exerciseName 3x5:</label>
                <input type="text" 
                placeholder='65'/>
            </div>
            <div>
                <label>exerciseName 3x5:</label>
                <input type="text" 
                placeholder='65'/>
            </div>
            <div>
                <label>exerciseName 3x5:</label>
                <input type="text" 
                placeholder='65'/>
            </div>
            <div>
                <label>exerciseName 3x5:</label>
                <input type="text" 
                placeholder='65'/>
            </div>
            <div>
                <label>exerciseName 3x5:</label>
                <input type="text" 
                placeholder='65'/>
            </div>
            <div>
                <button onClick={handleSubmit}>Send It</button>
            </div>
        </form>
        </div>
    );
    };

export default NewWorkoutScreen;