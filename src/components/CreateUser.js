import React, { useState } from "react";
import axios from "axios";
import "./CreateUser.css";

export default function CreateUser() {
  const [user, setUser] = useState({ user: "" });

  function onChangeUsername(e) {
    setUser({
      username: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: user.username,
    };
    console.log(newUser);
    axios
      .post("http://localhost:3500/users/add", newUser)
      .then((res) => console.log(res.data));

    setUser({
      username: "",
    });

    // sends you back to the homepage
    window.location = "/";
  }

  return (
    <div className="createPage">
      <h3>Create New User</h3>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username </label>
          <input
            type="text"
            required
            name="username"
            value={user.username}
            onChange={onChangeUsername}
            className="form-item"
          />
        </div>
        <div className="form-group">
          <button className="create-button"> Create User </button>
        </div>
      </form>
    </div>
  );
}
