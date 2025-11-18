import React, { useState } from "react";
import { AuthContext } from "./LoginContext";
import { apiClient } from "../../api/apiClient";
import { executeBasicAuthentication, executeJwtAuthentication } from "./AuthenticationApiService";

export const LoginContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  console.log("login", isLogin);
  console.log("username ", username);

  async function login(username, password) {
    try {
      const response = await executeJwtAuthentication(username,password);
      if (response.status == 200) {
        console.log("Authentication Success:", response);
        const jwtToken = "Bearer "+response.data.token;
        setIsLogin(true);
        setUsername(username);
        setToken(jwtToken);
        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        console.log("Authentication Failed:", error);
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setIsLogin(false);
    setUsername(null);
    // setToken(null);
    // localStorage.removeItem("isLoggedIn");
  }

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
};
