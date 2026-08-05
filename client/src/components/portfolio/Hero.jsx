import { FiArrowDownRight, FiArrowUpRight, FiMapPin } from "react-icons/fi";
import portrait from "../../assets/img/foto.jpg";

function Hero() {
  return <section className="hero section" id="inicio">
    <div className="hero-copy">
      <p className="eyebrow"><span /> La Plata, Buenos Aires, Argentina</p>
      <h1><em>Desarrollador Full Stack</em> con experiencia en aplicaciones web y APIs.</h1>
      <p className="hero-description">Soy Ignacio Pérez Etchegaray, Full Stack Developer. Desarrollo aplicaciones web, APIs y sistemas institucionales desde La Plata, Argentina.</p>
      <div className="hero-actions"><a className="button button-primary" href="#proyectos">Ver proyectos <FiArrowDownRight /></a><a className="button button-quiet" href="mailto:nachoperezetc@gmail.com">Contactarme <FiArrowUpRight /></a></div>
      <div className="hero-meta"><span><FiMapPin /> La Plata, Buenos Aires</span><span>React · Laravel · Java · React Native</span></div>
    </div>
    <div className="portrait-wrap"><div className="portrait-accent" /><img src={portrait} alt="Ignacio Pérez Etchegaray" /><div className="portrait-note"><span>03+</span> años creando software</div></div>
  </section>;
}

export default Hero;
