import React from "react";
import Home from "../Home";
import NavBar from "../NavBar/NavBar.jsx";
import User from "../userCard/User.jsx";
import style from "./Technologies.module.css";
const Technologies = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={style.flexContainer}>
        <div>
          <User />
        </div>
        <div className={style.technologiesContainer}>
          <div>
            <h1 className={style.title}>Mis tecnologias</h1>
          </div>
          <div>
            <p className={style.param}>
            Recientemente he completado con éxito el bootcamp "Henry", lo cual me ha permitido desarrollarme y aprender a utilizar diversas tecnologías, como lo son:
            </p>
          </div>
          <div className={style.flex}>
            <div className={style.gridContainer}>
              <a href="https://reactjs.org/" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg"
                  alt="React"
                />
              </a>
              <a href="https://www.w3schools.com/css/" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg"
                  alt="CSS3"
                />
              </a>
              <a href="https://en.wikipedia.org/wiki/HTML5" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg"
                  alt="HTML5"
                />
              </a>
              <a href="https://www.javascript.com/" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg"
                  alt="JavaScript"
                />
              </a>
              <a href="https://www.figma.com/" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/figma-icon.svg"
                  alt="Figma"
                />
              </a>
              <a href="https://github.com/" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg"
                  alt="Git"
                />
              </a>
              <a href="https://nodejs.org/" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg"
                  alt="Node.js"
                />
              </a>
              <a href="https://expressjs.com/" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg"
                  alt="Express.js"
                />
              </a>
              <a href="https://www.postgresql.org/" target="_blank">
                <img
                  className={style.imgTech}
                  src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg"
                  alt="PostgreSQL"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Technologies;
