import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          ExerciseTracker
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Exercises
        </Link>

        <Link to="/create" className="navbar-link">
          Create Exercise Log
        </Link>

        <Link to="/users" className="navbar-link">
          Create User
        </Link>
      </div>
    </nav>
  );
}
