import React from "react";

export const ErrorComponent = () => {
  console.log("ErrorComponent rendered for invalid URL");
  return (
    <div className="ErrorComponent">
      <h2>404 - Page Not Found</h2>
    </div>
  );
};
