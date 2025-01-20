import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/LoginContext";

export const HeaderComponent = () => {
  const navigate = useNavigate();
  const context = useAuth()
  console.log(context.number);
  
  return (
    <div className="HeaderComponent">
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              Home
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li> */}
              <li><Link to="/todos" className="nav-link px-2 text-white">Todos</Link></li>
              <li><Link to="/about" className="nav-link px-2 text-white">About</Link></li>
            </ul>

            <div className="text-end">
              <button 
                type="button" 
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/login")} // Use only navigation here
              >
                Login
              </button>
              <button type="button" className="btn btn-warning">Sign-up</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
