"use client";
import React, {useState} from "react";
import AddCalorieScreen from "../addCalorieScreen/AddCalorieScreen";

export default function AddCalorieButton({workout, user}) {
    const [showAddCalorieScreen, setShowAddCalorieScreen] = useState(false)
    const handleWorkoutClick = () => {
        setShowAddCalorieScreen(true);
      };

    return (
        <div>
            <button onClick={handleWorkoutClick}>Add Calorie Entry</button>
            {showAddCalorieScreen && (<AddCalorieScreen workout={workout} setAddCalorieScreen={setShowAddCalorieScreen} user={user} />)}
        </div>
    )
}