import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './Component/Button'

function App() {
  
  const [color,setBgColor] = useState("lavender");

  const changeColor = (newColor) => {
    setBgColor(newColor.toLowerCase());
  };

  return (
    <>
      <div className='w-full h-screen' style={{backgroundColor:color}}>
      <div className="absolute bottom-0 left-0 w-full flex justify-center bg-gray-100 py-4">
      <Button name="RED" onClick = {changeColor}/>
      <Button name="GREEN" onClick = {changeColor}/>
      <Button name="BLUE" onClick = {changeColor}/>
      <Button name="OLIVE" onClick = {changeColor}/>
      <Button name="GREY" onClick = {changeColor}/>
      <Button name="YELLOW" onClick = {changeColor}/>
      <Button name="PINK" onClick = {changeColor}/>
      <Button name="PURPLE" onClick = {changeColor}/>
      <Button name="LAVENDER" onClick = {changeColor}/>
      <Button name="WHITE" onClick = {changeColor}/>
      <Button name="BLACK" onClick = {changeColor}/>
      </div>
      </div>
      {/* <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}
    </>
  )
}

export default App
