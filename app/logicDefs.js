// functions to reference throughout the app
import { lowerLowRoutine, lowerMediumRoutine, lowerHighRoutine, upperLowRoutine, upperMediumRoutine, upperHighRoutine } from './routineDefs';

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
            setRoutine(upperLowRoutine);
        case 2:
            setRoutine(lowerLowRoutine);
        case 3:
            setRoutine(upperMediumRoutine);
        case 4:
            setRoutine(lowerMediumRoutine);
        case 5:
            setRoutine(upperHighRoutine);
        case 6:
            setRoutine(lowerHighRoutine);
        default:
            return "No Routine";
    };
}

