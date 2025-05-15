import React from "react";
import "./Navbar.css";
import Images from "../../assets/Images";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={Images.logo_white_bg} alt="Smart Entrance Security" className="navbar-logo" />
      <h1 className="navbar-title">Smart Entrance Security</h1>
      <img src={Images.logo_ue} alt="University Of Education" className="navbar-logo" />
    </nav>
  );
};

export default Navbar;
