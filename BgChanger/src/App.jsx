import { useState } from "react";
import "./App.css";
import Button from "./Component/Button";

function App() {
  const [color, setBgColor] = useState("white");

  // Function to change background color
  const changeColor = (newColor) => {
    setBgColor(newColor.toLowerCase());
  };

  return (
    <div className="w-full h-screen duration-200" style={{backgroundColor:color, width:"100%"}} >
      {/* Buttons container */}
      <div className="absolute bottom-0 left-0 w-full flex flex-wrap justify-center bg-gray-100 py-4">
        <Button name="RED" onClick={changeColor} />
        <Button name="GREEN" onClick={changeColor} />
        <Button name="BLUE" onClick={changeColor} />
        <Button name="OLIVE" onClick={changeColor} />
        <Button name="GREY" onClick={changeColor} />
        <Button name="YELLOW" onClick={changeColor} />
        <Button name="PINK" onClick={changeColor} />
        <Button name="PURPLE" onClick={changeColor} />
        <Button name="LAVENDER" onClick={changeColor} />
        <Button name="WHITE" onClick={changeColor} />
        <Button name="BLACK" onClick={changeColor} />
      </div>
    </div>
  );
}

export default App;
