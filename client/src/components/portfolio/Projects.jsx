import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import hotelVideo from "../../assets/video/proyectofinal.mp4";
import rutinappVideo from "../../assets/video/rutinapp.mp4";

const projects = [
  { title: "Plataforma de gestión hotelera", video: hotelVideo, description: "Proyecto final de Henry: plataforma web para explorar hoteles, gestionar reservas y pagos, con panel de administración y estadísticas.", tags: ["React", "Node.js", "Express", "Mercado Pago"], repository: "https://github.com/IgnacioPerezEtc/Proyecto-Final", videoLabel: "Video demostrativo de la plataforma de hoteles" },
  { title: "App de entrenamiento", video: rutinappVideo, description: "App mobile con Expo para organizar rutinas de gimnasio, sin backend, con AsyncStorage para persistencia local. Flujo completo de entrenamiento (series, descansos, restauración de sesión), UI custom con animaciones y gestos, audio, haptics, notificaciones nativas y despliegue con EAS.", tags: ["React Native", "Expo", "AsyncStorage", "EAS"], videoLabel: "Video demostrativo de Rutinapp" },
];

function ProjectCard({ project, index }) {
  return <article className="project-card">
    <div className="project-video"><video src={project.video} muted loop autoPlay playsInline controls aria-label={project.videoLabel} /></div>
    <div className="project-content"><p className="project-number">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.repository && <div className="project-links"><a href={project.repository} target="_blank" rel="noreferrer">Código <FiGithub /></a></div>}</div>
  </article>;
}

function Projects() {
  return <section className="section projects" id="proyectos">
    <div className="section-heading row-heading"><div><p className="section-label">Proyectos</p><h2>Proyectos realizados.</h2></div><a className="text-link" href="https://github.com/IgnacioPerezEtc" target="_blank" rel="noreferrer">Ver GitHub <FiArrowUpRight /></a></div>
    <div className="projects-list" style={{ display: "grid", gap: "1.5rem" }}>{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
  </section>;
}

export default Projects;
