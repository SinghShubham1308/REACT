import React, {useState } from "react";
import { AuthContext } from "./LoginContext";

export const LoginContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  function login(username, password) {
    if (username === "SinghShubham" && password === "TodoApp") {
      setIsLogin(true);
      localStorage.setItem("isLoggedIn", "true"); // Persist login state
      return true;
    } else {
      setIsLogin(false);
      localStorage.removeItem("isLoggedIn");
      return false;
    }
  }

  function logout() {
    setIsLogin(false);
    localStorage.removeItem("isLoggedIn");
  }

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
