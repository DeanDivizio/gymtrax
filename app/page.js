/* This Next.js app is going to be for tracking gym workouts. 
it will have a routine which functions as a template. the routine will consist of two components, muscle group and energy level. muscle group will determine the exercises that will be done, and energy level will determine sets, reps, and weight.
weight values can be changed by the user but will be prefilled based on energy level and previous weight values.
each workout will have a unique id and will be stored in a database.
database interaction will be done through a REST API.
*/
"use client"
import React, {useEffect, useState} from 'react';
import { determineRoutine, fetchWorkout } from './logicDefs';


const Page = () => {
  const [routine, setRoutine] = useState(null); //template, used to populate workout
  const [workout, setWorkout] = useState(null); //current workout, will be stored in database
  const [previousWorkout, setPreviousWorkout] = useState(null);

  useEffect(() => {
    // determine day of the week and use it to set the routine.
    // make api call to pull values from workout 7 days ago and use them + 10% to set the prefilled values.
    // if no workout 7 days ago, use the values from previous workout of same muscle group.
    // fetchWorkout(setPreviousWorkout);
    // determineRoutine(setRoutine)
      const getWorkout = async () => {
        const workout = await fetchWorkout(setPreviousWorkout);
        setPreviousWorkout(workout);
      };
      getWorkout();
  }, []);

  const fetchWorkout = async (setPreviousWorkout) => {
    const query = `
    query getOneWeekGymData {
        gymDataItems {
          nodes {
            id
          }
        }
      }
`; 
  
    const response = await fetch('https://api.deandivizio.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + btoa('gymAPI:liR)3OhSK(nIn)RXQv3!VDdr') },
        body: JSON.stringify({ query }),
    });
    const { data } = await response.json();
    console.log(data.gymDataItems.nodes);

    return(data);
}

// if (previousWorkout === null) {
//     return(null);
//   };

  return (
    <div>
      {/* display a title and 2 buttons, one for new workout and one to view previous workout data. these will be links to separate pages*/}
      <h1>GymTrax</h1>
      <button onClick={fetchWorkout}>New Workout</button>
    </div>
  );
};

export default Page;