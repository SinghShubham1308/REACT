import React, { useState } from "react";
import { AuthContext } from "./LoginContext";
import { executeBasicAuthentication } from "../../api/TodoApi";

export const LoginContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(null);
  console.log("login", isLogin);
  console.log("username ", username);

  // function login(username, password) {
  //   if (username === "SinghShubham" && password === "TodoApp") {
  //     setIsLogin(true);
  //     setUsername(username);
  //     localStorage.setItem("isLoggedIn", "true"); // Persist login state
  //     return true;
  //   } else {
  //     setIsLogin(false);
  //     setUsername(null);
  //     localStorage.removeItem("isLoggedIn");
  //     return false;
  //   }
  // }

  async function login(username, password) {
    const token = "Basic " + window.btoa(username + ":" + password);
    console.log("Generated Token: ", token);
    try {
      const response = await executeBasicAuthentication(token);
      if (response.status == 200) {
        console.log("Authentication Success:", response);
        setIsLogin(true);
        setUsername(username);
        localStorage.setItem("isLoggedIn", "true"); // Persist login state
        return true;
      } else {
        console.log("Authentication Failed:", error);
        setIsLogin(false);
        setUsername(null);
        localStorage.removeItem("isLoggedIn");
        return false;
      }
    } catch (error) {
      setIsLogin(false);
      setUsername(null);
      return false;
    }
  }

  function logout() {
    setIsLogin(false);
    setUsername(null);
    localStorage.removeItem("isLoggedIn");
  }

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};
