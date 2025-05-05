import { Link, useNavigate } from "react-router-dom";
import { House, PlusSquare, BoxArrowRight, BoxArrowInRight, PersonPlus } from "react-bootstrap-icons";

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <strong>B</strong>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-4">
            <li className="nav-item">
              <Link className="nav-link d-flex flex-column align-items-center" to="/">
                <House size={24} />
                <small>Home</small>
              </Link>
            </li>

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link d-flex flex-column align-items-center" to="/create-product">
                  <PlusSquare size={24} />
                  <small>Create Product</small>
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                <span className="text-white me-2">Hi, {user.firstName}</span>
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  <BoxArrowRight size={20} className="me-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light" to="/login">
                  <BoxArrowInRight size={20} className="me-1" />
                  Login
                </Link>
                <Link className="btn btn-primary" to="/signup">
                  <PersonPlus size={20} className="me-1" />
                  Sign-up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
