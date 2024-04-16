"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { fetchWorkout, getRecentEntries, addEntry } from './actions';
import NewWorkoutScreen from '../components/newWorkoutScreen/NewWorkoutScreen';
import { lowerRoutine, upperRoutine } from './routineDefs';
import styles from './page.module.css';

const Page = () => {
  let routine = {};
  let previousWorkout = {};
  const [user, setUser] = useState('dean'); // this will need to be set differently. eventually though login. right now a drop down or multiple buttons since it's secured through CF.
  const [workout, setWorkout] = useState({});
  const [showNewWorkoutScreen, setShowNewWorkoutScreen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const determineRoutine = () => {
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
  const formattedDate = useMemo(() => {
    const today = new Date();
    return `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  }, []);
  const date = formattedDate;

  const handleWorkoutClick = () => {
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
          } else {
            previousWorkout = routine;
          }
        }
      }
    }
    await recentsAsyncWrapper();
    if (previousWorkout) {
      setWorkout(previousWorkout);
    }
    setLoggedIn(true);
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
      <h1>GymTrax</h1>
      {!loggedIn && <button onClick={handleUserClick}>Login</button>}
      {loggedIn && <button onClick={handleWorkoutClick}>New Workout</button>}
      {showNewWorkoutScreen && <NewWorkoutScreen date={date} user={user} workout={workout} />}
      </div>
    </div>
  );
};

export default Page;