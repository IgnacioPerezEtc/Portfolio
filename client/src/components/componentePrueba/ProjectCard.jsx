import React from "react";
import style from "./ProjectCard.module.css";
import videoPf from "../../assets/video/proyectofinal.mp4";
import videoPi from "../../assets/video/proyectoindividual.webm";
import iconGitHub from "../../assets/icons/github.svg";
import iconVercel from "../../assets/icons/vercel.svg";
const ProjectCard = () => {
  return (
    <div>
     
        <div className={style.centrar}>
          <div className={`${style.projectContainer} projectContainer`}>
            <div className={style.flexProject}>
              <h2 className={style.titleProjects}>Proyecto Final</h2>
              <div className={style.flex}>
                <video
                  className={style.video}
                  src={videoPf}
                  muted
                  loop
                  controls
                ></video>

                <div>
                  <p className={style.paramProject}>
                    Este proyecto involucró el desarrollo de una página web de
                    hoteles, donde se podían ver los hoteles junto con sus
                    habitaciones, realizar reservas, pagar con MercadoPago,
                    filtrar por estrellas y por idioma, y también contaba con un
                    modo de administrador para que el dueño pudiera ver
                    estadísticas y actualizar información, entre otras
                    funcionalidades. Mi principal aporte se centró en el diseño
                    de la parte del Front-end, asegurándome de que la
                    información se presentara de manera clara y visible, además
                    de agregar funcionalidades específicas para el cliente.
                  </p>
                  <div className={style.buttonContainer}>
                    <a
                      className={style.link}
                      href="https://proyecto-final-client.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className={style.buttonDeploy}>
                        <img className={style.iconVercel} src={iconVercel} />{" "}
                        Deploy
                      </button>
                    </a>
                    <a
                      className={style.link}
                      href="https://github.com/IgnacioPerezEtc/Proyecto-Final"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className={style.buttonProject}>
                        <img
                          className={style.iconGitHub}
                          src={iconGitHub}
                          alt=""
                        />{" "}
                        GitHub
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<div className={style.centrar}>
        <div className={`${style.projectContainer} projectContainer`}>
          <div className={style.flexProject}>
            <h2 className={style.titleProjects}>Proyecto Individual</h2>
            <div className={style.flex}>
              <a
                href="https://deploy-gamma-liard.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <video
                  className={style.video}
                  src={videoPi}
                  muted
                  loop
                  controls
                ></video>
              </a>
              <div>
                <p className={style.paramProject}>
                  En mi primera experiencia para demostrar mis conocimientos en
                  las tecnologías aprendidas, tuve que realizar el proyecto
                  individual. Consistió en una aplicación de una sola página
                  dedicada a Pokémon, donde debía mostrar los pokémon
                  disponibles utilizando una API externa y una base de datos
                  creada. Además de esto, en el Front-end tuve que agregar
                  filtros, crear nuevos pokémon, manejar errores visibles para
                  los clientes y muchas otras funciones.
                </p>

                <div className={style.buttonContainer}>
                  <a
                    className={style.link}
                    href="https://deploy-gamma-liard.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={style.buttonDeploy}>
                      <img
                        className={style.iconVercel}
                        src={iconVercel}
                        alt=""
                      />{" "}
                      Deploy
                    </button>
                  </a>
                  <a
                    className={style.link}
                    href="https://github.com/IgnacioPerezEtc/PI-Pokemon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={style.buttonProject2}>
                      <img
                        className={style.iconGitHub}
                        src={iconGitHub}
                        alt=""
                      />
                      GitHub
                    </button>
                  </a>
                </div>
              </div>
            </div></div>
          </div>
        </div>
     
    </div>
  );
};
export default ProjectCard;
