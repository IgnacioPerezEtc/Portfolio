import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import User from "../userCard/User.jsx";
import style from "./Technologies.module.css";

const Technologies = ({ handleDarkModeToggle, isDarkMode, setIsDarkMode }) => {
  const techStack = [
    {
      name: "React",
      src: "https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg",
      url: "https://reactjs.org/",
    },
    {
      name: "CSS3",
      src: "https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg",
      url: "https://www.w3schools.com/css/",
    },
    {
      name: "HTML5",
      src: "https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg",
      url: "https://en.wikipedia.org/wiki/HTML5",
    },
    {
      name: "JavaScript",
      src: "https://profilinator.rishav.dev/skills-assets/javascript-original.svg",
      url: "https://www.javascript.com/",
    },
    {
      name: "Figma",
      src: "https://profilinator.rishav.dev/skills-assets/figma-icon.svg",
      url: "https://www.figma.com/",
    },
    {
      name: "Git",
      src: "https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg",
      url: "https://github.com/",
    },
    {
      name: "Node.js",
      src: "https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg",
      url: "https://nodejs.org/",
    },
    {
      name: "Express.js",
      src: "https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg",
      url: "https://expressjs.com/",
    },
    {
      name: "PostgreSQL",
      src: "https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg",
      url: "https://www.postgresql.org/",
    },
  ];

  const renderTechStack = techStack.map((tech, index) => (
    <a href={tech.url} target="_blank" key={index}>
      <img
        className={`${style.imgTech} imgTech`}
        src={tech.src}
        alt={tech.name}
      />
    </a>
  ));

  return (
    <div>
      <NavBar
        handleDarkModeToggle={handleDarkModeToggle}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className={style.flexContainer}>
        <div>
          <User />
        </div>
        <div className={style.technologiesContainer}>
          <div>
            <h1 className={`${style.title} title`}>Mis tecnologias</h1>
          </div>
          <div>
            <p className={`${style.param} param`}>
              Recientemente he completado con éxito el bootcamp "Henry", lo cual
              me ha permitido desarrollarme y aprender a utilizar diversas
              tecnologías, como lo son:
            </p>
          </div>
          <div className={style.flex}>
            <div className={style.gridContainer}>{renderTechStack}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
