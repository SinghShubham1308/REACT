import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <button
      onClick={() => onClick(name)} // Call the passed onClick function with `name`
      className="btn font-medium text-white m-2 px-4 py-2 rounded-lg"
      style={{
        backgroundColor: name.toLowerCase(), // Dynamically set background
        color: name === "BLACK" ? "white" : "black", // Ensure contrast
      }}
    >
      {name}
    </button>
  );
};

export default Button;
