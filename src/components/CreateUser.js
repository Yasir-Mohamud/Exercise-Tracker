import React, { useState } from "react";

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

    setUser({
      username: "",
    });
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={user.username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
