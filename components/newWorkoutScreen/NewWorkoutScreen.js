"use client"
import React, {useState} from 'react';
import { addEntry } from '../../app/actions';
import { useIntegerDate } from '../hooks';
import styles from './newWorkoutScreen.module.css';

const NewWorkoutScreen = ({user, workout, setShowNewWorkoutScreen}) => {
    const [submitText, setSubmitText] = useState('Send It');
    let date = useIntegerDate();
    console.log("User:", user);
    console.log("Workout:", workout);
    console.log("Date:", date);


const handleSubmit = (e) => {
    
    e.preventDefault(); //keeps page from reloading
    let updatedWorkout = {...workout}; //takes new values and updates the workout object
    Object.keys(workout.exercises).forEach((key, index) => {
        let input = document.getElementById(`input-${key}`);
        if(input) {
            updatedWorkout.exercises[key].weight = Number(input.value);
        }
    });
    const finalWorkout = { //the final workout object that will be sent to the database
        user: user,
        data: updatedWorkout,
        workoutDate: parseInt(date)
    };
    addEntry(finalWorkout); //sends the final workout object to the database
    setSubmitText('Check'); //changes the submit button text to 'Check'
    setTimeout(() => { //closes new workout screen after 1 second
        setShowNewWorkoutScreen(false);
    }, 1000);
   
}
    const handleClose = () => {
      setShowNewWorkoutScreen(false)
    }

    let heading = `${workout.muscleGroup} Body`; // set variable heading based on routine
    heading = heading.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // capitalize first letter of each word in heading

    return (
        <div className={styles.screenContainer}>
        <h2><em>Get After It</em></h2>
        <h3>{heading}</h3> {/*dynamically set heading based on routine */}
        <form className={styles.formContainer} onSubmit={handleSubmit}> {/* goes through previous workout to generate form for current workout and sets input placeholders to previous weight values */}
            {workout && workout.exercises && Object.keys(workout.exercises).map((key) => (
                <div className={styles.formDiv} key={key}>
                    <label>{workout.exercises[key].displayName} 3x5:</label>
                    <input 
                        type="number" 
                        id={`input-${key}`}
                        placeholder={workout.exercises[key].weight.toString()}
                    />
                </div>
            ))}
            <div>
                <button type="submit">{submitText}</button>
            </div>
        </form>
        <button className={styles.cancelButton} onClick={handleClose}>Cancel</button> {/* button to go back to the main screen */}
        </div>
    );
};

export default NewWorkoutScreen;