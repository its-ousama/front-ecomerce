import { Link } from "react-router-dom";
import { House, PlusSquare, BoxArrowInRight, PersonPlus } from "react-bootstrap-icons";

const NavBar = () => {
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
            <li className="nav-item">
              <Link className="nav-link d-flex flex-column align-items-center" to="/create-product">
                <PlusSquare size={24} />
                <small>Create Product</small>
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link className="btn btn-outline-light" to="/login">
              <BoxArrowInRight size={20} className="me-1" />
              Login
            </Link>
            <Link className="btn btn-primary" to="/signup">
              <PersonPlus size={20} className="me-1" />
              Sign-up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
