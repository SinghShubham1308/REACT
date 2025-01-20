import React from "react";
import {Link, useParams } from "react-router-dom";

export const WelcomeComponent = () => {
  const { username } = useParams();
  return (
    <div className="WelcomeComponent">
      <h2> Welcome {username} </h2>
      <div>
        Manage your Todos <Link to ="/todos"> todos</Link>
       
      </div>
    </div>
  );
};
