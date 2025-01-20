import React, { useState } from "react";
import {AuthContext} from "./LoginContext";
export const LoginContextProvider = ({ children }) => {
  const [number,setNumber] = useState(10);
  return (
    <AuthContext.Provider value={{ number }}>{children}</AuthContext.Provider>
  );
};
