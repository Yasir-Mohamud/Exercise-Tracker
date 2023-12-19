import React from "react";
import { Link } from "react-router-dom";
import "./Exercise.css";

export default function Exercise(props) {
  console.log("prps in exercise component" + props.exercise._id);
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td className="actions">
        <Link className="edit" to={"/edit/" + props.exercise._id}>
          edit
        </Link>
        {"   "}|{"   "}
        <a
          className="delete"
          href="#"
          onClick={() => props.deleteExercise(props.exercise._id)}
        >
          delete
        </a>
      </td>
    </tr>
  );
}
