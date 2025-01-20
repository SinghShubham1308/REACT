import React from "react";
import { useParams } from "react-router";

export const WelcomeComponent = () => {
  const {username} = useParams();
    return (
      <div className="WelcomeComponent">
        <div className="SuccessMessage"> Welcome {username} </div>
      </div>
    );
  };
  