import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./CreateExercise.css";

export default function CreateExercise() {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: "",
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3500/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setExercise((prev) => {
            return {
              ...prev,
              users: response.data.map((user) => user.username),
              username: response.data[0].username,
            };
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onChangeUsername(e) {
    setExercise((prev) => {
      return { ...prev, username: e.target.value };
    });
  }

  function onChangeDescription(event) {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setExercise((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(exercise);
  }

  function onChangeDuration(e) {
    setExercise((prev) => {
      return { ...prev, duration: e.target.value };
    });
  }

  function onChangeDate(date) {
    setExercise((prev) => {
      return { ...prev, date: date };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newExercise = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };

    console.log(newExercise);
    // sends you back to home page
    axios
      .post("http://localhost:3500/exercises/add", newExercise)
      .then((res) => console.log(res.data));
    window.location = "/";
  }

  return (
    <div className="create-exercise">
      <h3>Create New Exercise Log</h3>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username </label>
          <select
            required
            value={exercise.username}
            name="username"
            onChange={onChangeUsername}
            className="form-items"
          >
            {exercise.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description </label>
          <input
            type="text"
            required
            value={exercise.description}
            name="description"
            onChange={onChangeDescription}
            className="form-items"
          />
        </div>

        <div className="form-group">
          <label>Duration (in minutes) </label>
          <input
            type="text"
            name="duration"
            value={exercise.duration}
            onChange={onChangeDuration}
            className="form-items"
          />
        </div>
        <div className="form-group">
          <label>Date </label>
          <div>
            <DatePicker
              className="form-items"
              selected={exercise.date}
              onChange={onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <button className="button">Create Exercise Log</button>
        </div>
      </form>
    </div>
  );
}
