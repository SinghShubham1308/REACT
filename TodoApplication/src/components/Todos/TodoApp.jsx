import React, { useState } from "react";
import "./TodoApp.css";
import { LoginComponent } from "../Login/LoginComponent";

export const TodoApp = () => {
  return (
    <div className="TodoAppComponent">
      <LoginComponent/>
    </div>
  );
};