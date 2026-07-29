import { useEffect, useRef, useState } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiBriefcase,
  FiCheck,
  FiCode,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import portrait from "./assets/img/foto.jpg";
import hotelVideo from "./assets/video/proyectofinal.mp4";
import "./App.css";

const stack = {
  Frontend: ["React", "React Native", "Vue", "JavaScript", "TypeScript"],
  Backend: ["Laravel", "PHP", "Java", "Spring Boot", "Node.js", "Express", "Python"],
  Datos: ["MySQL", "PostgreSQL", "MongoDB"],
  Herramientas: ["Git", "Drupal", "Expo", "EAS", "Figma", "Scrum"],
};

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      setHideHeader(scrollingDown && currentY > 96);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("nachoperezetc@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:nachoperezetc@gmail.com";
    }
  };

  return (
    <div className="site-shell">
      <header className={hideHeader && !menuOpen ? "header header--hidden" : "header"}>
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Ir al inicio">
          <span>IP</span><i />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir navegación" aria-expanded={menuOpen}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className={menuOpen ? "navigation is-open" : "navigation"} aria-label="Navegación principal">
          {[["Experiencia", "experiencia"], ["Proyectos", "proyectos"], ["Stack", "stack"], ["Contacto", "contacto"]].map(([label, id]) => (
            <a href={`#${id}`} key={id} onClick={closeMenu}>{label}</a>
          ))}
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}>
            {dark ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> La Plata, Buenos Aires, Argentina</p>
            <h1><em>Desarrollador Full Stack</em> con experiencia en aplicaciones web y APIs.</h1>
            <p className="hero-description">Soy Ignacio Pérez Etchegaray, Full Stack Developer. Desarrollo aplicaciones web, APIs y sistemas institucionales desde La Plata, Argentina.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#proyectos">Ver proyectos <FiArrowDownRight /></a>
              <a className="button button-quiet" href="mailto:nachoperezetc@gmail.com">Contactarme <FiArrowUpRight /></a>
            </div>
            <div className="hero-meta">
              <span><FiMapPin /> La Plata, Buenos Aires</span>
              <span>React · Laravel · Java · React Native</span>
            </div>
          </div>
          <div className="portrait-wrap">
            <div className="portrait-accent" />
            <img src={portrait} alt="Ignacio Pérez Etchegaray" />
            <div className="portrait-note"><span>03+</span> años creando software</div>
          </div>
        </section>

        <section className="intro section" aria-label="Perfil profesional">
          <p className="section-label">Perfil</p>
          <p>Full Stack Developer con más de tres años de experiencia desarrollando aplicaciones web, APIs y sistemas institucionales para el Ministerio de Educación de la Provincia de Buenos Aires.</p>
        </section>

        <section className="section experience" id="experiencia">
          <div className="section-heading">
            <p className="section-label">Experiencia</p>
            <h2>Experiencia profesional.</h2>
          </div>
          <article className="experience-card">
            <div className="experience-date">MAY 2023 — HOY</div>
            <div className="experience-main">
              <div className="role-heading"><FiBriefcase /><div><h3>Full Stack Developer</h3><p>Ministerio de Educación de la Provincia de Buenos Aires</p></div></div>
              <p className="experience-summary">Desarrollo y mantenimiento de aplicaciones web y sistemas institucionales para distintas áreas del Ministerio y el portal oficial ABC.</p>
              <ul>
                <li>Diseño de interfaces modernas y responsivas con React y Vue.</li>
                <li>APIs REST y lógica de negocio con Laravel, PHP, Java (Spring Boot) y Python.</li>
                <li>Modernización de aplicaciones heredadas y evolución de módulos en Drupal.</li>
                <li>Trabajo colaborativo orientado a rendimiento, escalabilidad y mantenibilidad.</li>
              </ul>
            </div>
          </article>
        </section>

        <section className="section projects" id="proyectos">
          <div className="section-heading row-heading">
            <div><p className="section-label">Proyectos</p><h2>Proyectos realizados.</h2></div>
            <a className="text-link" href="https://github.com/IgnacioPerezEtc" target="_blank" rel="noreferrer">Ver GitHub <FiArrowUpRight /></a>
          </div>
          <article className="project-card">
            <div className="project-video"><video src={hotelVideo} muted loop autoPlay playsInline controls aria-label="Video demostrativo de la plataforma de hoteles" /></div>
            <div className="project-content">
              <p className="project-number">01 / 01</p>
              <h3>Plataforma de gestión hotelera</h3>
              <p>Proyecto final de Henry: plataforma web para explorar hoteles, gestionar reservas y pagos, con panel de administración y estadísticas.</p>
              <div className="tags"><span>React</span><span>Node.js</span><span>Express</span><span>Mercado Pago</span></div>
              <div className="project-links">
                <a href="https://proyecto-final-client.vercel.app/" target="_blank" rel="noreferrer">Ver demo <FiArrowUpRight /></a>
                <a href="https://github.com/IgnacioPerezEtc/Proyecto-Final" target="_blank" rel="noreferrer">Código <FiGithub /></a>
              </div>
            </div>
          </article>
        </section>

        <section className="section skills" id="stack">
          <div className="section-heading"><p className="section-label">Stack tecnológico</p><h2>Herramientas para cada capa del producto.</h2></div>
          <div className="skills-grid">
            {Object.entries(stack).map(([area, items]) => <article className="skill-group" key={area}><h3><FiCode /> {area}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}
          </div>
        </section>

        <section className="section education">
          <p className="section-label">Formación</p>
          <div className="education-grid"><div><span>2025 — actualidad</span><h3>Licenciatura en Ciencia de Datos</h3><p>Universidad Nacional de La Plata</p></div><div><span>Finalizado en 2023</span><h3>Desarrollador Full Stack</h3><p>Henry</p></div><div><span>Idiomas</span><h3>Español (nativo) · Inglés (intermedio)</h3></div></div>
        </section>
      </main>

      <footer className="footer" id="contacto" style={{ paddingTop: "4.5rem" }}>
        <p className="section-label" style={{ fontSize: ".9rem", letterSpacing: ".12em" }}>Contacto</p>
        <h2 style={{ margin: ".7rem 0 1.6rem", fontSize: "clamp(1.65rem, 3vw, 2.45rem)", letterSpacing: "-.045em" }}>Correo electrónico</h2>
        <div className="contact-actions">
          <a className="mail-link" href="mailto:nachoperezetc@gmail.com">nachoperezetc@gmail.com <FiArrowUpRight /></a>
          <button className="copy-button" onClick={copyEmail}>{copied ? <><FiCheck /> Correo copiado</> : <><FiCopy /> Copiar correo</>}</button>
        </div>
        <div className="footer-bottom" style={{ marginTop: "4.5rem" }}><span>© {new Date().getFullYear()} Ignacio Pérez Etchegaray</span><div><a href="https://github.com/IgnacioPerezEtc" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="https://www.linkedin.com/in/ignacio-perez-etchegaray-0858b724a/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div></div>
      </footer>
    </div>
  );
}

export default App;
