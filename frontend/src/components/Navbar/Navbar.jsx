import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="https://picsum.photos/40" alt="Logo" className="navbar-logo" />
      <h1 className="navbar-title">Smart Entrance Security</h1>
      <img src="https://picsum.photos/40?2" alt="Logo" className="navbar-logo" />
    </nav>
  );
};

export default Navbar;
