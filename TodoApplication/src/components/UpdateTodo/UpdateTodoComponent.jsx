import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {retreiveTodoWithId, updateTodoById } from "../../api/TodoApi";

export const UpdateTodoComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    description: "",
    done: false,
    targetDate: "",
  });

  useEffect(() => {
    retreiveTodoWithId("SinghShubham", id)
      .then((response) => setTodo(response.data))
      .catch((error) => console.log("Error fetching todo:", error));
  }, [id]);

  function handleChange(event) {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateTodoById("SinghShubham", id, todo)
      .then(() => {
        navigate("/"); // Go back to the list after updating
      })
      .catch((error) => console.log("Error updating todo:", error));
  }

  return (
    <div className="container mt-5">
      <h2>Update Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={todo.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Target Date</label>
          <input
            type="date"
            className="form-control"
            name="targetDate"
            value={todo.targetDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="done"
            checked={todo.done}
            onChange={() => setTodo({ ...todo, done: !todo.done })}
          />
          <label className="form-check-label">Completed</label>
        </div>
        <button type="submit" className="btn btn-success">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};
