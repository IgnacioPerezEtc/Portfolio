import React from "react";
import style from "./About.module.css";
import reactIcon from "../../assets/icons/react-2.svg";
import nodeIcon from "../../assets/icons/nodejs-icon.svg";

function About() {
  return (
    <div className={style.about}>
      <div>
        <h1 className={`${style.title} title`}>Acerca de mi</h1>
      </div>
      <div className={style.flexParam}>
        <p className={`${style.param} param`}>
          Recientemente completé el bootcamp "Henry" con éxito, adquiriendo
          habilidades y conocimientos valiosos en el desarrollo de software.
          Durante el bootcamp, tuve la oportunidad de trabajar en equipo en
          proyectos en tiempo real, lo que me permitió desarrollar habilidades
          importantes en la colaboración y la comunicación. <br />
        </p>
      </div>
      <div>
        <h1 className={`${style.title2} title2`}>Mis habilidades</h1>
      </div>
      <div className={style.flexContainer}>
        <div className={style.gridContainer}>
          <div className={`${style.habilitiesContainer} habilitiesContainer`}>
            <div className={style.flex}>
              <img src={reactIcon} className={style.reactIcon} alt="" />
              <div>
                <h2 className={style.titleHabilities}>Front End</h2>
                <p className={style.paramHabilities}>
                  Con mis habilidades en React.js, que incluyen el uso de Redux,
                  puedo desarrollar aplicaciones web de alta calidad y
                  funcionalidad.
                </p>
              </div>
            </div>
          </div>
          <div className={`${style.habilitiesContainer} habilitiesContainer`}>
            <div className={style.flex}>
              <img src={nodeIcon} className={style.nodeIcon} alt="" />
              <div>
                <h2 className={style.titleHabilities}>Back End</h2>
                <p className={style.paramHabilities}>
                  Tengo experiencia en el uso de Node junto a Express, lo cual
                  me permite manejar información relevante de manera efectiva.
                </p>
              </div>
            </div>
          </div>
          <div className={`${style.habilitiesContainer} habilitiesContainer`}>
            <div className={style.flex}>
              <img
                className={style.reactIcon}
                src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg"
                alt="PostgreSQL"
              />
              <div>
                <h2 className={style.titleHabilities}>Base de datos</h2>
                <p className={style.paramHabilities}>
                  He adquirido experiencia utilizando PostgreSQL junto a
                  Sequelize, lo cual me permite manejar bases de datos de manera
                  efectiva.
                </p>
              </div>
            </div>
          </div>
          <div className={`${style.habilitiesContainer} habilitiesContainer`}>
            <div className={style.flex}>
              <img
                className={style.reactIcon}
                src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg"
                alt="CSS3"
              />
              <div>
                <h2 className={style.titleHabilities}>Diseño UI</h2>
                <p className={style.paramHabilities}>
                  Tengo experiencia en el uso de CSS, incluyendo el uso de
                  Flexbox, Grid y Media Queries, lo cual me permite crear
                  diseños atractivos y responsivos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
