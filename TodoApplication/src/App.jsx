import "./App.css";
import { LoginComponent } from "./components/Login/LoginComponent";
import {HeaderComponent} from "./components/Header/HeaderComponent"
import {FooterComponent} from "./components/Footer/FooterComponent"
import { Outlet } from "react-router";
import { LoginContextProvider } from "./components/Context/LoginContextProvider";
function App() {
  return (
    <LoginContextProvider>
      <HeaderComponent />
      <Outlet/>
      <FooterComponent />
    </LoginContextProvider>
  );
}

export default App;
