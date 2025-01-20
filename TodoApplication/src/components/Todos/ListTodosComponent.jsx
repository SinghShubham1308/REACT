import React from "react";

export const ListTodosComponent = () => {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDate()
  );

  const listTodos = [
    {
      id: 1,
      description: "Learn Spring and Spring Boot",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 2,
      description: "Practice React Hooks",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 3,
      description: "Work on Todo App project",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 4,
      description: "Review Redux concepts",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 5,
      description: "Learn REST API integration",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 6,
      description: "Prepare for coding interview",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 7,
      description: "Read about microservices architecture",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 8,
      description: "Complete unit testing tasks",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 9,
      description: "Enhance CSS skills with Flexbox",
      done: false,
      targetDate: targetDate,
    },
    {
      id: 10,
      description: "Explore GraphQL fundamentals",
      done: false,
      targetDate: targetDate,
    },
  ];

  return (
    <div className="ListTodosComponent">
      <h2 className="text-center mb-4">Todo List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Is Completed</th>
              <th>Target Date</th>
            </tr>
          </thead>
          <tbody>
            {listTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done ? "Yes" : "No"}</td>
                <td>{todo.targetDate.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
