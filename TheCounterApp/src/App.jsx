import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // var counter = 0
  let [counter, setCounter] = useState(0);
  function addCounter() {
    
    if (counter < 20) {
      setCounter(counter+1);
    }
  }
  function subtractCounter() {
 
    if (counter > 0) {
      setCounter(counter-1);
    } 
  }

  return (
    <>
      <h1>count is {counter}</h1>
      <button onClick={addCounter}>increase</button>
      <br />
      <button onClick={subtractCounter}>decrease</button>
    </>
  );
}

export default App;
