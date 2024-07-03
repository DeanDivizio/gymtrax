import React from 'react';
import { determineRoutine, useIntegerDate } from '../components/hooks.js'
import { getPreviousWorkout } from "./actions"
import { currentUser } from '@clerk/nextjs/server'
import NewWorkoutButton from '../components/NewWorkoutButton/NewWorkoutButton'
import AddCalorieButton from '../components/addCallButton/AddCalorieButton.js'
import styles from './page.module.css';

const Page = async () => {
  let date = useIntegerDate();
  let routine = determineRoutine();
  let username;
  let workout;
  const user = await currentUser();
  const getUsername = async () => {
    username = user.username
  }
  await getUsername();
  const workoutAsyncWrapper = async () =>{
    workout = await getPreviousWorkout({ username, routine});
  }
  await workoutAsyncWrapper();
 
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <h1>GymTrax</h1>
        <div>
          <h2>{`Welcome Back, ${user.firstName}`}</h2> 
          <div className={styles.buttonContainer}>
            <NewWorkoutButton user={username} workout={workout}/>
            <AddCalorieButton user={username}/>
            <button>{'Stats Placeholder'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;