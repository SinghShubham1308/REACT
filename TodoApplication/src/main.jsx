import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { LoginComponent } from "./components/Login/LoginComponent.jsx";
import { WelcomeComponent } from "./components/Welcome/WelcomeComponent.jsx";
import { ErrorComponent } from "./components/Error/ErrorComponent.jsx";
import { ListTodosComponent } from "./components/Todos/ListTodosComponent.jsx";
import { LogoutComponent } from "./components/Logout/LogoutComponent.jsx";
import { HomeComponent } from "./components/Home/HomeComponent.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css"; // Your custom styles if any
import { LoginContextProvider } from "./components/Context/LoginContextProvider.jsx";
import { useAuth } from "./components/Context/LoginContext.js";
import { SignupForm } from "./components/Signup/Signup.jsx";

function AuthenticateRoute({ children }) {
  const auth = useAuth(); // Use the hook properly to get the authentication context

  if (auth.isLogin) {
    console.log("children", children);
    return children;
  }

  return <Navigate to="/" />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<HomeComponent />} /> {/* Default route */}
        <Route path="login" element={<LoginComponent />} />
        <Route path="signup" element={<SignupForm />} />
        <Route
          path="welcome/:username"
          element={
            <AuthenticateRoute>
              <WelcomeComponent />
            </AuthenticateRoute>
          }
        />
        <Route
          path="todos"
          element={
            <AuthenticateRoute>
              <ListTodosComponent />
            </AuthenticateRoute>
          }
        />
        <Route
          path="logout"
          element={
            <AuthenticateRoute>
              <LogoutComponent />
            </AuthenticateRoute>
          }
        />
        <Route
          path="*"
          element={
            <AuthenticateRoute>
              <ErrorComponent />
            </AuthenticateRoute>
          }
        />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
