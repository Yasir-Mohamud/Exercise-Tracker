import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function EditExercise() {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3500/exercises/" + exercise.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
      .post(
        "http://localhost:3500/exercises/update/" + exercise.match.params.id,
        exercise
      )
      .then((response) => console.log(response.data));
    window.location = "/";
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
