import React from "react";
import NavBar from "../NavBar/NavBar";
import User from "../userCard/User.jsx";
import style from "./Projects.module.css";
import ProjectCard from "../ProjectCard/ProjectCard.jsx";
function Projects({ handleDarkModeToggle, isDarkMode, setIsDarkMode }) {
  return (
    <>
      <NavBar
        handleDarkModeToggle={handleDarkModeToggle}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className={style.flexContainer}>
        <div className={style.userContainer}>
          <User />
        </div>
        <div className={style.projectsContainer}>
          <div>
            <h1 className={`${style.title} title`}>Mis Proyectos</h1>
            <div>
              <p className={`${style.param} param`}>
                Durante mi participación en el bootcamp, realicé dos grandes
                proyectos que me permitieron poner a prueba los conocimientos
                adquiridos y, al mismo tiempo, aprender a integrarlos en un
                sitio web.
              </p>
            </div>{" "}
            <div className={style.scroll}>
              <ProjectCard />
            </div>
            <div className={style.mobile}>
              <ProjectCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
