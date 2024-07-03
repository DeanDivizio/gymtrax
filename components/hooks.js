import { lowerRoutine, upperRoutine } from '../app/routineDefs';
import React, {useMemo} from 'react';

export function determineRoutine() { // determines the routine for the day based on the day of the week
    const day = new Date().getDay();
    let routine;
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
    return(routine);
  }

  export function useIntegerDate() {
    const formattedDate = useMemo(() => { // gets the current date in yyyymmdd format and formats it as a string
    const today = new Date();
    return `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
  }, []);
  const date = parseInt(formattedDate); // converts the formatted date to an integer for later use.
  return date;
}