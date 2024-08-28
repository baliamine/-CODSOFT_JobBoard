import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">JobBoard</Link>
      </div>
      <ul className="navbar-content">
        <li>
          <Link to="/employer-profile" className="link">
            My Profile
          </Link>
        </li>
        <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="none" />
      </ul>
    </nav>
  );
}

export default Navbar;
