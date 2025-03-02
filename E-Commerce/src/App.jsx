import "./App.css";
import Navbar from "./Customer/Components/Navigation/Navbar";
import { HomePage } from "./Customer/Pages/HomePage/HomePage";

function App() {
  return (
    <>
      <div className="">
        <Navbar />
        <div>
          <HomePage/>
        </div>
      </div>
    </>
  );
}

export default App;
