import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    name:"Shubham",
    age:24
  }
  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Card username="Shubham" btnText = "Click Me "/>
    <Card username="Arjun" btnText = "Visit Me "/>
    </>
  )
}

export default App
