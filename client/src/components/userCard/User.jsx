import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/img/foto.jpg";
import pdf from "../../assets/img/CvIgnacioPerez.pdf";
import style from "./User.module.css";

const User = () => {
  const [developerRole] = useState("Full Stack");

  return (
    <div className={style.flexContainer2}>
      <div className={style.bodyContainer}>
        <div className={`${style.infoContainer} infoContainer`}>
          <div className={style.flexContainer}>
            <div className={style.imgContainer}>
              <img className={style.foto} src={img} alt="" />
            </div>
            <div>
              <div className={style.titleContainer}>
                <h1 className={style.title}>Soy Ignacio Perez</h1>
                <h2 className={style.title}>
                  <h3 className={style.Developer}>
                    <span className={style.span}> {developerRole} </span>
                    Developer
                  </h3>
                </h2>
              </div>
              <div className={style.paramContainer}>
                <p className={style.param}>
                  Soy un desarrollador de software junior con experiencia en
                  tecnologías como React js, Node js, PostgreSQL, CSS y HTML
                </p>
              </div>
              <div className={style.buttonContainer}>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CvIgnacioPerez.pdf"
                >
                  <button className={style.buttonCV}>
                    <FontAwesomeIcon
                      className={style.iconDownload}
                      icon={faDownload}
                    />
                    Descargar CV
                  </button>
                </a>
                <NavLink to="/">
                  <button
                    className={`${style.button} button`}
                    onClick={() =>
                      window.open("mailto:nachoperezetc@gmail.com")
                    }
                  >
                    <FontAwesomeIcon
                      className={style.iconUser}
                      icon={faEnvelope}
                    />
                    Contactame
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
