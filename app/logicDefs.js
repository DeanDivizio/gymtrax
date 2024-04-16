// functions to reference throughout the app
import { lowerRoutine, upperRoutine} from './routineDefs';

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}

const date = new Date(); // Get current date
const week = getWeekNumber(date);



export const determineRoutine = (setRoutine) => {
    const day = new Date().getDay();
    switch(day) {
        case 0:
            return "rest day"
        case 1:
            setRoutine(upperRoutine);
        case 2:
            setRoutine(lowerRoutine);
        case 3:
            setRoutine(upperRoutine);
        case 4:
            setRoutine(lowerRoutine);
        case 5:
            setRoutine(upperRoutine);
        case 6:
            setRoutine(lowerRoutine);
        default:
            return "No Routine";
    };
}

