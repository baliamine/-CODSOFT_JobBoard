import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useLogout } from "../../hooks/UseLogout";
import UseAuthContext from "../../hooks/UseAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = UseAuthContext();
console.log('user', user)
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {user ? (
          <Link
            to={user.user.role === "employer" ? "/Employer-home" : "/JobSeeker-home"}
          >
            JobBoard
          </Link>
        ) : (
          <Link to="/">JobBoard</Link> // You can change this to the desired link for unauthenticated users
        )}
      </div>
      <ul className="navbar-content">
        {!user ? (
          <div>
            <Link to="/Login" className="login">
              Login
            </Link>
            <Link to="/signup" className="signup">
              Signup
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to={
                user?.user?.role === "employer"
                  ? "/Employer-profile"
                  : "/JobSeeker-profile"
              }
              className="link"
            >
              <img src={user?.user?.img} alt="Profile" />
            </Link>
            <button onClick={handleLogout} className="logout">
              Log out
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
