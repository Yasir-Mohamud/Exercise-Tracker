import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercise() {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    setExercise((prev) => {
      return {
        ...prev,
        users: ["test user", "test user 2"],
        username: "test user",
      };
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

    const exerciseData = {
      username: exercise.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };

    console.log(exerciseData);

    //   window.location = "/";
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={exercise.username}
            name="username"
            onChange={onChangeUsername}
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
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            name="description"
            onChange={onChangeDescription}
          />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={exercise.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
