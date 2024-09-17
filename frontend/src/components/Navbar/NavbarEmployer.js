import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useLogout } from "../../hooks/UseLogout";
import UseAuthContext from "../../hooks/UseAuthContext";

const NavbarEmployer = () => {
  const { logout } = useLogout();
  const { user } = UseAuthContext();

  const handelLogout = () => {
    logout();
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/Employer-home">JobBoard</Link>
      </div>
      <ul className="navbar-content">
        {!user && (
          <div>
            <Link to="/Login" className="login">
              Login
            </Link>
            <Link to="/signup" className="signup">
              Signup
            </Link>
          </div>
        )}

        {user && (
          <div>
            <Link to="/Employer-profile" className="link">
              <img
                src="https://randomuser.me/api/portraits/men/52.jpg"
                alt="none"
              />
            </Link>
            <span> {user.email}</span>
            <button onClick={handelLogout} className="logout">
              Log out
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavbarEmployer;
