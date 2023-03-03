import React from "react";
import style from "./Home.module.css";
import NavBar from "./NavBar/NavBar";
import About from "./About/About";
import User from "./userCard/User.jsx";

const Home = ({ handleDarkModeToggle, isDarkMode, setIsDarkMode }) => {
  return (
    <div>
      <NavBar
        handleDarkModeToggle={handleDarkModeToggle}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className={style.flexContainer2}>
        <User />
        <div className={style.aboutContainer}>
          <About />
        </div>
      </div>
    </div>
  );
};

export default Home;