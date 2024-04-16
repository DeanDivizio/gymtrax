/* This Next.js app is going to be for tracking gym workouts. 
it will have a routine which functions as a template to determine the exercises that will be done, sets, reps, and weight.
weight values can be changed by the user but will be prefilled based previous weight values.
each workout will have a unique id based on the date in yyyymmdd format and will be stored in a database.
database interaction will be done through the V3 AWS SDK.
*/

"use client"
import React, {useEffect, useState} from 'react';
import { determineRoutine, fetchWorkout, getRecentEntries, addEntry } from './actions';
import NewWorkoutScreen from '../components/newWorkoutScreen/NewWorkoutScreen';
import { lowerRoutine, upperRoutine} from './routineDefs';

// current issue is the page is getting rendered 3 times on load. this causes the useEffect to run 3 times and the getRecentEntries function to run 3 times.
const Page = () => {
  console.log('page');
  const [routine, setRoutine] = useState({}); 
  const [previousWorkout, setPreviousWorkout] = useState(null);
  const [workout, setWorkout] = useState(null); 
  const [showNewWorkoutScreen, setShowNewWorkoutScreen] = useState(false);
  const [date, setDate] = useState(null);

  const determineRoutine = (setRoutine) => {
    const day = new Date().getDay();
    switch(day) {
      case 0:
          setRoutine("rest day");
          break;
      case 1:
          setRoutine(upperRoutine);
          break;
      case 2:
          setRoutine(lowerRoutine);
          break;
      case 3:
          setRoutine(upperRoutine);
          break;
      case 4:
          setRoutine(lowerRoutine);
          break;
      case 5:
          setRoutine(upperRoutine);
          break;
      case 6:
          setRoutine(lowerRoutine);
          break;
      default:
          setRoutine("No Routine");
  };
}
  const makeDate = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    setDate(formattedDate);
 
  }

   useEffect(() => {
    makeDate(); //makes sure we have a properly formatted date
    determineRoutine(setRoutine); //determines the routine based on the day of the week. sets the routine state to template object
     async function recentsAsyncWrapper() { //fetches the most recent workout entries
      const recentEntries = await getRecentEntries('test');
      setPreviousWorkout(recentEntries);
      }
    recentsAsyncWrapper();
  },[]);


  useEffect(() => {
    if (previousWorkout) {
      for (let i = 0; i < previousWorkout.length; i++) {
       if (previousWorkout[i].data.muscleGroup == routine.muscleGroup) {
          setPreviousWorkout(previousWorkout[i]);
          break;
        }
      }
    }
  }
  ,[routine, previousWorkout]);

  useEffect(() => { //this works perfect
    if (previousWorkout) {
      setWorkout(previousWorkout);
    }
  }, [previousWorkout]);

  const handleWorkoutClick = () => {
    // setShowNewWorkoutScreen(true);
  // addEntry('test', routine, parseInt(date));
    console.log(previousWorkout);
    console.log(routine.muscleGroup);
    console.log(workout);
  }

  return (
    <div>
      <h1>GymTrax</h1>
      <button onClick={handleWorkoutClick}>New Workout</button>
      {showNewWorkoutScreen && <NewWorkoutScreen workout={workout}/>}
      <button onClick={handleWorkoutClick}>Log Routine</button>
    </div>
  );
};

export default Page;