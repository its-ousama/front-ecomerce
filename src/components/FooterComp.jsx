import { Link } from "react-router-dom";

const FooterComp = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <footer className="py-3 bg-light mt-auto">
      <ul className="nav justify-content-center pb-3">
        <li className="nav-item">
          <Link to="/" className="nav-link px-2">
            Home
          </Link>
        </li>
        {!user && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link px-2">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link px-2">
                Sign-up
              </Link>
            </li>
          </>
        )}
        {user?.role === "admin" && (
          <li className="nav-item">
            <Link to="/create-product" className="nav-link px-2">
              Create Product
            </Link>
          </li>
        )}
      </ul>
    </footer>
  );
};

export default FooterComp;
