"use client"
import React, {useEffect, useState} from 'react';

const NewWorkoutScreen = ({routine, previousWorkout, workout}) => {

console.log(workout);

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
}

    return (
        <div>
        <h2><em>Get After It</em></h2>
        <h3>Upper Body</h3>
        <form>
            {workout && workout.exercises && Object.keys(workout.exercises).map((key) => (
                <div key={key}>
                    <label>{workout.exercises[key].displayName} 3x5:</label>
                    <input type="number" 
                    placeholder={workout.exercises[key].weight.toString()}/>
                </div>
            ))}
            <div>
                <button onClick={handleSubmit}>Send It</button>
            </div>
        </form>
        </div>
    );
};

export default NewWorkoutScreen;