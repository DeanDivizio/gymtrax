"use client";
import React, {useState} from "react";
import NewWorkoutScreen from "../newWorkoutScreen/NewWorkoutScreen";

export default function NewWorkoutButton({workout, user}) {
    const [showNewWorkoutScreen, setShowNewWorkoutScreen] = useState(false)
    const handleWorkoutClick = () => { // sets the showNewWorkoutScreen variable to true when the new workout button is clicked
        setShowNewWorkoutScreen(true);
      };

    return (
        <div>
            <button onClick={handleWorkoutClick}>New Workout</button>
            {showNewWorkoutScreen && (<NewWorkoutScreen workout={workout} setShowNewWorkoutScreen={setShowNewWorkoutScreen} user={user} />)}
        </div>
    )
}