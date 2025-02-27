import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodoApi } from "../../api/TodoApi"; // Ensure this API function exists
import { useAuth } from "../Context/LoginContext";

export const AddTodoComponent = () => {
  const User = useAuth();

  const navigate = useNavigate();
  
  const [todo, setTodo] = useState({
    description: "",
    targetDate: "",
    done:false,
  });
  
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!todo.description || !todo.targetDate) {
      setErrorMessage("Both fields are required!");
      return;
    }

    addTodoApi(User.username, todo,User.token)
      .then(() => {
        navigate("/todos"); // Navigate back to the todo list
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        setErrorMessage("Failed to add todo. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Todo</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={todo.description}
            onChange={handleChange}
            placeholder="Enter todo description"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Target Date</label>
          <input
            type="date"
            name="targetDate"
            className="form-control"
            value={todo.targetDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/todos")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};
