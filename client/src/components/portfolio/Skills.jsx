import { FiCode } from "react-icons/fi";

const stack = {
  Frontend: ["React", "React Native", "Vue", "JavaScript", "TypeScript"],
  Backend: ["Laravel", "PHP", "Java", "Spring Boot", "Node.js", "Express", "Python"],
  Datos: ["MySQL", "PostgreSQL", "MongoDB"],
  Herramientas: ["Git", "Drupal", "Expo", "EAS", "Figma", "Scrum"],
};

function Skills() {
  return <section className="section skills" id="stack"><div className="section-heading"><p className="section-label">Stack tecnológico</p><h2>Herramientas para cada capa del producto.</h2></div><div className="skills-grid">{Object.entries(stack).map(([area, items]) => <article className="skill-group" key={area}><h3><FiCode /> {area}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section>;
}

export default Skills;
