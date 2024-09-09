import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavbarJobSeeker=()=> {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/JobSeeker-home">JobBoard</Link>
      </div>
      <ul className="navbar-content">
        <Link to="/JobSeeker-profile" className="link">
          <img
            src="https://randomuser.me/api/portraits/men/62.jpg"
            alt="none"
          />
        </Link>
      </ul>
    </nav>
  );
}

export default NavbarJobSeeker;
