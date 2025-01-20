import React, { useState } from "react";
import { WelcomeComponent } from "../Welcome/WelcomeComponent";
import { useNavigate } from "react-router";

export const LoginComponent = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    if (username === "SinghShubham" && password === "TodoApp") {
      setIsAuthenticated(true); // Mark as authenticated
      navigate(`/welcome/${username}`);
    } else {
      setIsInvalidUser(true); // Mark as unauthorised
    }
  };

  if (isAuthenticated) {
    return <WelcomeComponent />; // Render WelcomeComponent if authenticated
  }

  return (
    <div className="LoginComponent">
      Login Component
      <div className="LoginForm">
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              // console.log(e.target.value);

              setusername(e.target.value);
              if (isInvalidUser) setIsInvalidUser(false);
            }}
            className={isInvalidUser ? "inputError" : ""}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
              if (isInvalidUser) setIsInvalidUser(false); // Clear error on typing
            }}
            className={isInvalidUser ? "inputError" : ""}
          />
        </div>
      </div>
      {isInvalidUser && <div className="ErrorMessage">Invalid credentials</div>}
      <div>
        <button type="button" name="login" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};
