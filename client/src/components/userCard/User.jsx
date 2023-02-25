import React from "react";
import style from "./User.module.css";
import NavBar from "../NavBar/NavBar";
import img from "../../assets/img/foto.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import pdf from "../../assets/img/CvIgnacioPerez.pdf";
const User = () => {
  return (
    <div>
      <div className={style.flexContainer2}>
        <div className={style.bodyContainer}>
          <div className={style.infoContainer}>
            <div className={style.flexContainer}>
              <div className={style.imgContainer}>
                <img className={style.foto} src={img} alt="" />
              </div>
              <div>
                <div className={style.titleContainer}>
                  <h1 className={style.title}>Soy Ignacio Perez</h1>
                  <h2 className={style.title}>
                    <h3>
                      <span className={style.span}> Full Stack </span>
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

                  <button className={style.button}>
                    <FontAwesomeIcon className={style.iconUser} icon={faUser} />
                    Acerca de mi
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
