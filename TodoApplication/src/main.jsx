import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { LoginComponent } from './components/Login/LoginComponent.jsx'
import { WelcomeComponent } from './components/Welcome/WelcomeComponent.jsx'
import { ErrorComponent } from './components/Error/ErrorComponent.jsx'
import { ListTodosComponent } from './components/Todos/ListTodosComponent.jsx'
import { LogoutComponent } from './components/Logout/LogoutComponent.jsx'
import { HomeComponent } from './components/Home/HomeComponent.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';  // Your custom styles if any

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />}>
        <Route path="/" element={<HomeComponent />} />  {/* Explicitly set home route */}
        <Route path="login" element={<LoginComponent />} />
        <Route path="welcome/:username" element={<WelcomeComponent />} />
        <Route path="todos" element={<ListTodosComponent />} />
        <Route path="logout" element={<LogoutComponent />} />
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
