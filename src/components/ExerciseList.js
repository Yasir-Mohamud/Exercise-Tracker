import React, { useState, useEffect } from "react";
import axios from "axios";
import Exercise from "./Exercise";

export default function ExerciseList() {
  const [exercise, setExercise] = useState({
    exercises: [],
  });
  console.log(exercise.exercises);

  useEffect(() => {
    axios
      .get("http://localhost:3500/exercises/")
      .then((response) => {
        setExercise({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function deleteExercise(id) {
    axios
      .delete("http://localhost:3500/exercises/" + id)
      .then((response) => console.log(response.data));
    setExercise((prev) => {
      return {
        exercises: prev.exercises.filter((el) => el._id !== id),
      };
    });
  }

  function exerciseList() {
    return exercise.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}
