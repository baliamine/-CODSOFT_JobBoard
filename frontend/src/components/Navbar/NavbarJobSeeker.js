import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useLogout } from "../../hooks/UseLogout";

const NavbarJobSeeker=()=> {
  const {logout} =useLogout();


  const  handelLogout=()=>{
     logout()
   }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/JobSeeker-home">JobBoard</Link>
      </div>
      
      <ul className="navbar-content">
      <div>
          <Link to="/Login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
        <Link to="/JobSeeker-profile" className="link">
          <img
            src="https://randomuser.me/api/portraits/men/62.jpg"
            alt="none"
          />
        </Link>
        <button onClick={handelLogout}>Log out</button>
      </ul>
    </nav>
  );
}

export default NavbarJobSeeker;
