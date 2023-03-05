import React from "react";
import style from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { faSun } from "@fortawesome/fontawesome-free-regular";
import { faMoon } from "@fortawesome/fontawesome-free-regular";
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import BurgerButton from "../BurgerButton/BurgerButton.jsx";
import "./NavBar.css";

const NavBar = ({ handleDarkModeToggle, isDarkMode }) => {
  const [clicked, setClicked] = useState(false);
  let [currentClassName, setCurrentClassName] = useState("liContainer2");
  const handleLink = () => {
    setCurrentClassName("liContainer2");
    setClicked(false);
  };

  const handleBurger = () => {
    setClicked(!clicked);
  };
  const handleClick = () => {
    if (currentClassName === "liContainer") {
      setCurrentClassName("liContainer2");
    } else {
      setCurrentClassName("liContainer");
    }
    handleBurger();
  };
  const NavLinks = [
    {
      to: "/",
      text: "Acerca de mi",
      icon: faUser,
    },
    {
      to: "/tecnologias",
      text: "Mis tecnologias",
      icon: faMicrochip,
    },
    {
      to: "/proyectos",
      text: "Mis proyectos",
      icon: faLightbulb,
    },
  ];

  const socialLinks = [
    {
      href: "https://github.com/IgnacioPerezEtc",
      icon: <BsGithub className={`${style.iconSocial} iconSocial`} />,
      text: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/ignacio-p%C3%A9rez-etchegaray-0858b724a/",
      icon: <FaLinkedin className={`${style.iconSocial} iconSocial`} />,
      text: "Linkedin",
    },
  ];

  return (
    <div className={style.flexContainer}>
      <ul onClick={handleLink} className={currentClassName}>
        <li className={style.liItem} onClick={handleDarkModeToggle}>
          {isDarkMode ? (
            <p className={`${style.paramDark} paramDark`}>
              <FontAwesomeIcon className={style.iconDark} icon={faMoon} />
              Dark Mode
            </p>
          ) : (
            <p className={`${style.paramDark} paramDark`}>
              <FontAwesomeIcon icon={faSun} className={style.iconDark} />
              Light Mode
            </p>
          )}
        </li>
        {NavLinks.map((link, index) => (
          <NavLink key={index} className={style.nav} to={link.to}>
            <li onClick={handleLink} className={`${style.liItem} liItem`}>
              <FontAwesomeIcon className={style.icon} icon={link.icon} />
              {link.text}
            </li>
          </NavLink>
        ))}
        {socialLinks.map((link, index) => (
          <div key={index} className={style.nav}>
            <a href={link.href} target="_blank">
             
              <li className={style.liItemIcon}>
                {link.icon}
                <p className={`${style.textIcon} textIcon`}> {link.text}</p>
              </li>
            </a>
          </div>
        ))}
      </ul>
      <div className={style.burgerContainer}>
        <li className={style.burger} onClick={handleClick}>
          <BurgerButton
            clicked={clicked}
            className={style.burger}
            handleBurger={handleBurger}
          />
        </li>
      </div>
    </div>
  );
};

export default NavBar;
