"use client"
import React, { useState, useMemo } from 'react';
import { getRecentEntries } from './actions';
import NewWorkoutScreen from '../components/newWorkoutScreen/NewWorkoutScreen';
import { lowerRoutine, upperRoutine } from './routineDefs';
import styles from './page.module.css';

const Page = () => {
  let routine = {};
  let previousWorkout = {};
  const [user, setUser] = useState('dean'); // this will need to be set differently. eventually though login. right now a drop down or multiple buttons since it's secured through CF.
  const [workout, setWorkout] = useState({}); // this is used to populate the form with the previous workout values
  const [showNewWorkoutScreen, setShowNewWorkoutScreen] = useState(false); // this is used to toggle the new workout screen
  const [loggedIn, setLoggedIn] = useState(false); // this is used to toggle the login/new workout buttons

  const determineRoutine = () => { // determines the routine for the day based on the day of the week
    const day = new Date().getDay();
    switch (day) {
      case 0:
        routine = "rest day";
        break;
      case 1:
        routine = upperRoutine;
        break;
      case 2:
        routine = lowerRoutine;
        break;
      case 3:
        routine = upperRoutine;
        break;
      case 4:
        routine = lowerRoutine;
        break;
      case 5:
        routine = upperRoutine;
        break;
      case 6:
        routine = lowerRoutine;
        break;
      default:
        routine = "No Routine";
    };
  }
  const formattedDate = useMemo(() => { // gets the current date in yyyymmdd format and formats it as a string
    const today = new Date();
    return `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  }, []);
  const date = parseInt(formattedDate); // converts the formatted date to an integer for later use.

  const handleWorkoutClick = () => { // sets the showNewWorkoutScreen variable to true when the new workout button is clicked
    setShowNewWorkoutScreen(true);
  };

  const handleUserClick = async () => {
    determineRoutine(routine); //set routine variable to the routine for the day
    async function recentsAsyncWrapper() { // This gets recent entries, finds the most recent one that matches the routine for the current day, then sets the previousWorkout variable to that value.
      let recents = await getRecentEntries(user);
      if (recents) {
        for (let i = 0; i < recents.length; i++) {
          if (recents[i].data.muscleGroup == routine.muscleGroup) {
            previousWorkout = recents[i].data;
            break;
          } else { // in the event there are no matching entries, default to the stored routine
            previousWorkout = routine;
          }
        }
      }
    }
    await recentsAsyncWrapper();
    if (previousWorkout) { // set the workout state to the previous workout. 
      setWorkout(previousWorkout);
    }
    setLoggedIn(true); // set the loggedIn state to true and displays the new workout button
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
      <h1>GymTrax</h1>
      {!loggedIn && <button onClick={handleUserClick}>Login</button>}
      {loggedIn && <div>
        <h2>{`Welcome Back, ${user.charAt(0).toUpperCase() + user.slice(1)}`}</h2> 
        <button onClick={handleWorkoutClick}>New Workout</button>
        </div>}
      {showNewWorkoutScreen && <NewWorkoutScreen date={date} user={user} workout={workout} />}
      </div>
    </div>
  );
};

export default Page;