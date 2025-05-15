import React from "react";
import "./Button.css";

const Button = ({ type = "button", label, onClick, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="custom-button"
    >
      {label}
    </button>
  );
};

export default Button;
