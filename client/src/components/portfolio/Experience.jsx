import { FiBriefcase } from "react-icons/fi";

function Experience() {
  return <section className="section experience" id="experiencia">
    <div className="section-heading"><p className="section-label">Experiencia</p><h2>Experiencia profesional.</h2></div>
    <article className="experience-card"><div className="experience-date">MAYO 2023 — HOY</div><div className="experience-main"><div className="role-heading"><FiBriefcase /><div><h3>Full Stack Developer</h3><p>Ministerio de Educación de la Provincia de Buenos Aires</p></div></div><p className="experience-summary">Desarrollo y mantenimiento de aplicaciones web y sistemas institucionales para distintas áreas del Ministerio y el portal oficial ABC.</p><ul><li>Diseño de interfaces modernas y responsivas con React y Vue.</li><li>APIs REST y lógica de negocio con Laravel, PHP, Java (Spring Boot) y Python.</li><li>Modernización de aplicaciones heredadas y evolución de módulos en Drupal.</li><li>Trabajo colaborativo orientado a rendimiento, escalabilidad y mantenibilidad.</li></ul></div></article>
  </section>;
}

export default Experience;
