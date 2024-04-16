"use client"
import React from 'react';
import { addEntry } from '@/app/actions';

const NewWorkoutScreen = ({user, workout, date}) => {

console.log(workout);

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    let updatedWorkout = {...workout};
    Object.keys(workout.exercises).forEach((key, index) => {
        let input = document.getElementById(`input-${key}`);
        if(input) {
            updatedWorkout.exercises[key].weight = Number(input.value);
        }
    });
    console.log(updatedWorkout);
    const finalWorkout = {
        user: user,
        data: updatedWorkout,
        workoutDate: parseInt(date)
    };
    console.log(finalWorkout);
    addEntry(finalWorkout);
}
    let heading = `${workout.muscleGroup} Body`; // set variable heading based on routine
    heading = heading.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // capitalize first letter of each word in heading

    return (
        <div>
        <h2><em>Get After It</em></h2>
        <h3>{heading}</h3>
        <form onSubmit={handleSubmit}>
            {workout && workout.exercises && Object.keys(workout.exercises).map((key) => (
                <div key={key}>
                    <label>{workout.exercises[key].displayName} 3x5:</label>
                    <input 
                        type="number" 
                        id={`input-${key}`}
                        placeholder={workout.exercises[key].weight.toString()}
                    />
                </div>
            ))}
            <div>
                <button type="submit">Send It</button>
            </div>
        </form>
        </div>
    );
};

export default NewWorkoutScreen;