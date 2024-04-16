/* This Next.js app is going to be for tracking gym workouts. 
it will have a routine which functions as a template to determine the exercises that will be done, sets, reps, and weight.
weight values can be changed by the user but will be prefilled based previous weight values.
each workout will have a unique id based on the date in yyyymmdd format and will be stored in a database.
database interaction will be done through the V3 AWS SDK.
*/

"use client"
import React, {useEffect, useState, useMemo} from 'react';
import { fetchWorkout, getRecentEntries, addEntry } from './actions';
import NewWorkoutScreen from '../components/newWorkoutScreen/NewWorkoutScreen';
import { lowerRoutine, upperRoutine} from './routineDefs';

// current issue is the page is getting rendered 3 times on load. this causes the useEffect to run 3 times and the getRecentEntries function to run 3 times.
const Page = () => {
  console.log('page');
  let routine = {}; 
  let previousWorkout = {};
  const [workout, setWorkout] = useState({}); 
  const [showNewWorkoutScreen, setShowNewWorkoutScreen] = useState(false);

  const determineRoutine = (setRoutine) => {
    const day = new Date().getDay();
    switch(day) {
      case 0:
          routine="rest day";
          break;
      case 1:
          routine=upperRoutine;
          break;
      case 2:
          routine=lowerRoutine;
          break;
      case 3:
          routine=upperRoutine;
          break;
      case 4:
          routine=lowerRoutine;
          break;
      case 5:
          routine=upperRoutine;
          break;
      case 6:
          routine=lowerRoutine;
          break;
      default:
          routine="No Routine";
  };
}
const formattedDate = useMemo(() => {
  const today = new Date();
  return `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
}, []);
const date = formattedDate;

// useEffect(() => {
  
// }, []);

  const handleWorkoutClick = () => {
    setShowNewWorkoutScreen(true);
  };

  const handleUserClick = async () => {
    determineRoutine(routine); //set routine variable to the routine for the day
    let user = "test"; // this will need to be set differently. eventually though login. right now a drop down or multiple buttons since it's secured through CF.
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
      console.log(workout);
    }
  }

  return (
    <div>
      <h1>GymTrax</h1>
      <button onClick={handleWorkoutClick}>New Workout</button>
      {showNewWorkoutScreen && <NewWorkoutScreen workout={workout}/>}
      <button onClick={handleUserClick}>UserClick</button>
    </div>
  );
};

export default Page;