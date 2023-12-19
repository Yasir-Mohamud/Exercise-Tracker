import React, { useState, useEffect } from "react";
import axios from "axios";
import Exercise from "./Exercise";
import "./ExerciseList.css";

export default function ExerciseList() {
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/exercises/")
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function deleteExercise(id) {
    axios
      .delete("http://localhost:3500/exercises/" + id)
      .then((response) => console.log(response.data));
    setExercise((prev) => prev.filter((el) => el._id !== id));
  }

  console.log();
  function exerciseList() {
    return exercise.map((currentexercise) => {
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
    <div className="exerciseList">
      <h3>Logged Exercises</h3>
      {exercise.length === 0 ? (
        <p> There are currently no logged exercises</p>
      ) : (
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
      )}
    </div>
  );
}
