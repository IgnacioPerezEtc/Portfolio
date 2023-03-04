import React from "react";
import { FaReact } from "react-icons/fa";
import { DiNodejsSmall, DiPostgresql } from "react-icons/di";
import { SiPostgresql } from "react-icons/si";
import { FaCss3 } from "react-icons/fa";
import Icon from "../Icon/Icon.jsx";
import style from "./About.module.css";
import reactIcon from "../../assets/icons/react-2.svg";
import nodeIcon from "../../assets/icons/nodejs-icon.svg";

function About() {
  function renderAboutTitle() {
    return (
      <div>
        <h1 className={`${style.title} title`}>Acerca de mi</h1>
      </div>
    );
  }

  function renderSkills({ icon, title, description, className }) {
    return (
      <div className={`${style.habilitiesContainer} habilitiesContainer`}>
        <div className={style.flex}>
          <Icon src={icon} className={className} />
          <div>
            <h2 className={style.titleHabilities}>{title}</h2>
            <p className={style.paramHabilities}>{description}</p>
          </div>
        </div>
      </div>
    );
  }

  function renderSkillsTitle() {
    return (
      <div>
        <h1 className={`${style.title2} title2`}>Mis habilidades</h1>
      </div>
    );
  }

  return (
    <div className={style.about}>
      {renderAboutTitle()}
      <div className={style.flexParam}>
        <p className={`${style.param} param`}>
          Recientemente completé el bootcamp "Henry" con éxito, adquiriendo
          habilidades y conocimientos valiosos en el desarrollo de software.
          Durante el bootcamp, tuve la oportunidad de trabajar en equipo en
          proyectos en tiempo real, lo que me permitió desarrollar habilidades
          importantes en la colaboración y la comunicación. <br />
        </p>
      </div>
      {renderSkillsTitle()}
      <div className={style.flexContainer}>
        <div className={style.gridContainer}>
          {renderSkills({
            icon: reactIcon,
            title: "Front End",
            className: style.reactIcon,
            description:
              "Con mis habilidades en React.js, que incluyen el uso de Redux, puedo desarrollar aplicaciones web de alta calidad y funcionalidad.",
          })}
          {renderSkills({
            icon: nodeIcon,
            title: "Back End",
            className: style.nodeIcon,
            description:
              "Tengo experiencia en el uso de Node junto a Express, lo cual me permite manejar información relevante de manera efectiva.",
          })}
          {renderSkills({
            icon: "https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg",
            title: "Base de datos",
            className: style.reactIcon,
            description:
              "He adquirido experiencia utilizando PostgreSQL junto a Sequelize, lo cual me permite manejar bases de datos de manera efectiva.",
          })}
          {renderSkills({
            icon: "https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg",
            title: "Diseño UI",
            className: style.reactIcon,
            description:
              "Tengo experiencia en el uso de CSS, incluyendo el uso de Flexbox, Grid y Media Queries, lo cual me permite crear diseños atractivos y responsivos.",
          })}
        </div>
      </div>
    </div>
  );
}

export default About;
