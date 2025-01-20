import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { LoginComponent } from './components/Login/LoginComponent.jsx'
import { WelcomeComponent } from './components/Welcome/WelcomeComponent.jsx'
import { ErrorComponent } from './components/Error/ErrorComponent.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/welcome/:username" element={<WelcomeComponent />} />
      <Route path="*" element={<ErrorComponent />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
