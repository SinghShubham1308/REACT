import React from 'react';

const Button = ({ name, onClick }) => {
  return (
    <button
      onClick={() => onClick(name)} // Use the passed `onClick` function
      className="btn font-medium text-white m-4 p-2 rounded-lg"
      style={{
        backgroundColor: name.toLowerCase(), // Make background case-insensitive
        color: name === "BLACK" ? "white" : "black", // Ensure contrast
      }}
    >
      {name}
    </button>
  );
};

export default Button;
 