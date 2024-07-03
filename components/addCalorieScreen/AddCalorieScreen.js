"use client"
import React, {useState} from 'react';
import { addCalorieEntry } from '../../app/actions';
import { useIntegerDate } from '../hooks';
import styles from './addCalorieScreen.module.css';

const AddCalorieScreen = ({user, setAddCalorieScreen}) => {
    const [submitText, setSubmitText] = useState('Send It');
    let date = useIntegerDate();
    console.log("User:", user);
    console.log("Date:", date);


const handleSubmit = (e) => {
    
    e.preventDefault(); //keeps page from reloading

     // Fetch values from form inputs
     let calorieCount = document.getElementById('CalorieCount').value;
     let notes = document.getElementById('Notes').value;

    let calorieLog = {
        user: user,
        date: date,
        calorieCount: parseInt(calorieCount),
        notes: notes 
    };
    addCalorieEntry(calorieLog); //sends the final workout object to the database
    setSubmitText('Check'); //changes the submit button text to 'Check'
    setTimeout(() => { //closes new workout screen after 1 second
        setAddCalorieScreen(false);
    }, 1000);
   
}
    const handleClose = () => {
        setAddCalorieScreen(false)
    }

    return (
        <div className={styles.screenContainer}>
        <h2><em>Log Your Meal</em></h2>
        <h3>Keep it Low</h3>
        <form className={styles.formContainer} onSubmit={handleSubmit}> {/* goes through previous workout to generate form for current workout and sets input placeholders to previous weight values */}
                <div className={styles.formDiv}>
                    <label>Calorie Count</label>
                    <input 
                        type="number" 
                        id={`CalorieCount`}
                        placeholder={'A Number Goes Here'}
                        required
                    />
                </div>
                <div className={styles.formDiv}>
                    <label>Notes</label>
                    <input 
                        type="text" 
                        id={`Notes`}
                        placeholder={'What Did You Eat?'}
                        required
                    />
                </div>
            <div>
                <button type="submit">{submitText}</button>
            </div>
        </form>
        <button className={styles.cancelButton} onClick={handleClose}>Cancel</button> {/* button to go back to the main screen */}
        </div>
    );
};

export default AddCalorieScreen;