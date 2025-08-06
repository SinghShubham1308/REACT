import { Header } from "./component/Header/Header";
import { Footer } from "./component/Footer/Footer";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
