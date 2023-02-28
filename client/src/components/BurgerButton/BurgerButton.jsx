import React from "react";
import "./BurgerButton.css";
const BurgerButton = ({ handleBurger, clicked }) => {
  return (
    <div
      onClick={handleBurger}
      className={`icon nav-icon-5 ${clicked ? "open" : ""} `}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
export default BurgerButton;
