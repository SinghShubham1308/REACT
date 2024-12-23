import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { Outlet } from "react-router";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
        <Header/>
        {/* <Home></Home> */}
        <Outlet/>
        
        <Footer/>
    </>
  );
}

export default App;
