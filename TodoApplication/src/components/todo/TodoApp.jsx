import React, { useState } from "react";
import "./TodoApp.css";
export const TodoApp = () => {
  return (
    <div className="TodoApp">
      Todo Management App
      <LoginComponent />
      {/* <WelcomeComponent /> */}
    </div>
  );
};

const LoginComponent = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    if (username === "SinghShubham" && password === "TodoApp") {
      setIsAuthenticated(true); // Mark as authenticated
    } else {
      alert("Invalid credentials");
    }
  };

  if (isAuthenticated) {
    return <WelcomeComponent />; // Render WelcomeComponent if authenticated
  }
  return (
    <div className="Login">
      <div className="ErrorMessage">Login Failed</div>
      Login Component
      <div className="LoginForm">
        <div>
          <label htmlFor="">User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              // console.log(e.target.value);

              setusername(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <button type="button" name="login" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

const WelcomeComponent = () => {
  return (
    <div className="Welcome">
      <div className="SuccessMessage"> Successfully Logged In </div>
    </div>
  );
};
