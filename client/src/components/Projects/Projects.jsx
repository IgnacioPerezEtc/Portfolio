import React from "react";
import NavBar from "../NavBar/NavBar";
import User from "../userCard/User.jsx";
import style from "./Projects.module.css";
import videoPf from "../../assets/video/proyectofinal.mp4";
import videoPi from "../../assets/video/proyectoindividual.webm";
const Projects = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={style.flexContainer}>
        <div>
          <User />
        </div>
        <div className={style.projectsContainer}>
          <div>
            <h1 className={style.title}>Mis Proyectos</h1>
          </div>
          <div>
            <p className={style.param}>
              Durante mi participación en el bootcamp, realicé dos grandes
              proyectos que me permitieron poner a prueba los conocimientos
              adquiridos y, al mismo tiempo, aprender a integrarlos en un sitio
              web.
            </p>
          </div>
          <div className={style.gridContainer}>
            <div className={style.flex}>
              <div className={style.flexProject}>
                <figure>
                  <h2 className={style.titleProjects}>Proyecto Final</h2>
                  <a
                    className={style.link}
                    href="https://proyecto-final-client.vercel.app/"
                    target="_blank"
                  >
                    <video
                      className={style.video}
                      src={videoPf}
                      muted="true"
                      loop="true"
                      controls
                    ></video>
                    {/* <div className={style.hoverContainer}>
                      <h1>Hover Prueba</h1>
                      <p>
                        uaerat blanditiis accusantium alias. Officia obcaecati
                        explicabo incidunt quae aut tempore dignissimos quo
                        optio?
                      </p>
                      <button></button>
                    </div> */}
                  </a>
                </figure>
              </div>
              <div>
                <h2 className={style.titleProjects}>Proyecto Individual</h2>
                <a
                  href="https://deploy-gamma-liard.vercel.app/"
                  target="_blank"
                >
                  <video
                    className={style.video}
                    src={videoPi}
                    muted="true"
                    loop="true"
                    controls
                  ></video>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
