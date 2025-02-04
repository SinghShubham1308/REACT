import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteTodoById,
  retreiveTodo,
  updateTodoById,
} from "../../api/TodoApi";
import { useAuth } from "../Context/LoginContext";

export const ListTodosComponent = () => {
  const User = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDate()
  );
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    refreshTodo();
  }, []);

  function refreshTodo() {
    retreiveTodo(User.username)
      .then((response) => {
        console.log("Fetched", response);
        setTodos(response.data);
      })
      .catch((error) => console.log("Error fetching todos:", error));
  }

  function deleteById(id) {
    console.log("clicked");
    deleteTodoById(User.username, id)
      .then((response) => {
        setMessage("Todo with id ", id, "has been deleted successfully");
        setMessage(`Todo with ID ${id} deleted successfully!`);
        refreshTodo();
        // Remove message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => console.log("Error fetching todos:", error));
  }
  function updateById(id) {
    console.log("clicked");
    updateTodoById(User.username, id)
      .then((response) => {
        console.log("deleted", response, "id ", id);
        refreshTodo();
      })
      .catch((error) => console.log("Error fetching todos:", error));
  }

  function updateTodo(id) {
    navigate(`/update/${id}`); // Navigate to the update page
  }

  const listTodos = [
    // {
    //   id: 1,
    //   description: "Learn Spring and Spring Boot",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 2,
    //   description: "Practice React Hooks",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 3,
    //   description: "Work on Todo App project",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 4,
    //   description: "Review Redux concepts",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 5,
    //   description: "Learn REST API integration",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 6,
    //   description: "Prepare for coding interview",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 7,
    //   description: "Read about microservices architecture",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 8,
    //   description: "Complete unit testing tasks",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 9,
    //   description: "Enhance CSS skills with Flexbox",
    //   done: false,
    //   targetDate: targetDate,
    // },
    // {
    //   id: 10,
    //   description: "Explore GraphQL fundamentals",
    //   done: false,
    //   targetDate: targetDate,
    // },
  ];

  return (
    <div className="ListTodosComponent">
      <h2 className="text-center mb-4">Todo List</h2>
      {/* Success Message Display with Close Button */}
      {message && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage("")}
          ></button>
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {/* <th>ID</th> */}
              <th>Description</th>
              <th>Is Completed</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <tr key={todo.id}>
                  {/* <td>{todo.id}</td> */}
                  <td>{todo.description}</td>
                  <td>{todo.done ? "Yes" : "No"}</td>
                  <td>{new Date(todo.targetDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => deleteById(todo.id)}
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => updateTodo(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Todos Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
