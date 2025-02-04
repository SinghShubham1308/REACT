import React, {useState } from "react";
import { AuthContext } from "./LoginContext";

export const LoginContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username,setUsername] = useState(null)
  console.log("login",isLogin);
  console.log("username ",username);
  
  function login(username, password) {
    if (username === "SinghShubham" && password === "TodoApp") {
      setIsLogin(true);
      setUsername(username);
      localStorage.setItem("isLoggedIn", "true"); // Persist login state
      return true;
    } else {
      setIsLogin(false);
      setUsername(null);
      localStorage.removeItem("isLoggedIn");
      return false;
    }
  }

  function logout() {
    setIsLogin(false);
    localStorage.removeItem("isLoggedIn");
  }

  return (
    <AuthContext.Provider value={{isLogin, login, logout,username}}>
      {children}
    </AuthContext.Provider>
  );
};
