import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditExercise.css";

export default function EditExercise() {
  const params = useParams();

  const [exercise, setExercise] = useState({
    username: "",
    date: null,
    duration: "",
    description: "",
  });
  const [users, setUsers] = useState([]);
  console.log("params" + params.id);
  useEffect(() => {
    axios
      .get("http://localhost:3500/exercises/" + params.id)
      .then((response) => {
        console.log(response.data);
        setExercise((prev) => {
          return {
            ...prev,
            username: response.data.username,
            date: new Date(response.data.date),
            duration: response.data.duration,
            description: response.data.description,
          };
        });
      })
      .catch((error) => {
        console.log(` weee ${error}`);
      });

    axios
      .get("http://localhost:3500/users/")
      .then((response) => {
        console.log("user resp" + response.data);
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3500/exercises/update/" + params.id, exercise)
        .then((response) => console.log(response.data));

      window.location = "/";
    } catch (error) {
      console.log(error);
    }
    // window.location = "/";
  }

  return (
    <div className="edit-exercise">
      <h3>Edit Exercise Log</h3>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Username </label>
          <select
            required
            value={exercise.username}
            name="username"
            onChange={onChangeUsername}
            className="form-items"
          >
            {users.map((user) => {
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
          <button className="button">Edit</button>
        </div>
      </form>
    </div>
  );
}
