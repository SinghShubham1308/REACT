import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/LoginContext";

export const LoginComponent = () => {
  const [username, setUsername] = useState("SinghShubham");
  const [password, setPassword] = useState("TodoApp");
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const loginContext = useAuth();
  console.log("context",loginContext);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload
    if (loginContext.login(username, password)) {
      setIsInvalidUser(false);
      navigate(`/welcome/${username}`);
    } else {
      setIsInvalidUser(true);
    }
  };

  return (
    <div className="LoginComponent d-flex justify-content-center align-items-center vh-100">
      <div className="form-signin shadow p-4 bg-light rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <form onSubmit={handleLogin}>
          <img
            className="mb-4 mx-auto d-block"
            src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${isInvalidUser ? "border-danger" : ""}`}
              id="floatingInput"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (isInvalidUser) setIsInvalidUser(false);
              }}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${isInvalidUser ? "border-danger" : ""}`}
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (isInvalidUser) setIsInvalidUser(false);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start mb-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>

          {isInvalidUser && <div className="text-danger mb-3 text-center">Invalid credentials</div>}

          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>

          <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2024</p>
        </form>
      </div>
    </div>
  );
};
