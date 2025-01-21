import { useAuth } from "../Context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
export const HeaderComponent = () => {
  const loginContext = useAuth();
  // const loginContext = useContext(AuthContext)
  const isLogin = loginContext.isLogin;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="HeaderComponent">
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {isLogin && (
              <Link
                to="/"
                className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
              >
                Home
              </Link>
            )}

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {isLogin && (
                <>
                  <li>
                    <Link to="/todos" className="nav-link px-2 text-white">
                      Todos
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="nav-link px-2 text-white">
                      About
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="text-end">
              {isLogin ? (
                <div className="d-flex align-items-center">
                  <span className="text-white me-3">Welcome!</span>
                  <div className="dropdown text-end">
                    <Link
                      to="#"
                      className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="https://github.com/mdo.png"
                        alt="mdo"
                        width="32"
                        height="32"
                        className="rounded-circle"
                      />
                    </Link>
                    <ul className="dropdown-menu text-small">
                      <li>
                        <Link className="dropdown-item" to="#">
                          New project...
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button type="button" className="btn btn-warning">
                    Sign-up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
