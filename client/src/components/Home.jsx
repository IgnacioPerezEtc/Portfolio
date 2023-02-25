import React from "react";
import style from "./Home.module.css";
import img from "../assets/img/foto.jpg";
import NavBar from "./NavBar/NavBar";
import About from "./About/About";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import pdf from "../assets/img/CvIgnacioPerez.pdf";
import User from "./userCard/User.jsx";
import BurgerButton from "./BurgerButton/BurgerButton.jsx";

const Home = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
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
