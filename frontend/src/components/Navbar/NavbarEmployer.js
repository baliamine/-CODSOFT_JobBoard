import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useLogout } from "../../hooks/UseLogout";

 const NavbarEmployer=() =>{
  const {logout} =useLogout();


 const  handelLogout=()=>{
    logout()
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/Employer-home">JobBoard</Link>
      </div>
      <ul className="navbar-content">
        <div>
          <Link to="/Login" className="login">Login</Link>
          <Link to="/signup" className="signup">Signup</Link>
          
        </div>
        <Link to="/Employer-profile" className="link">
          <img
            src="https://randomuser.me/api/portraits/men/52.jpg"
            alt="none"
          />
        </Link>
        
        <button onClick={handelLogout} className="logout">Log out</button>
      </ul>
    </nav>
  );
}

export default NavbarEmployer;
