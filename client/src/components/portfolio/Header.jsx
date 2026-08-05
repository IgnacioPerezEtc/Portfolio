import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const links = [["Experiencia", "experiencia"], ["Proyectos", "proyectos"], ["Stack", "stack"], ["Contacto", "contacto"]];

function Header({ dark, hideHeader, menuOpen, onNavigate, onToggleMenu, onToggleTheme }) {
  return (
    <header className={hideHeader && !menuOpen ? "header header--hidden" : "header"}>
      <a className="brand" href="#inicio" onClick={onNavigate} aria-label="Ir al inicio"><span>Inicio</span><i /></a>
      <button className="menu-toggle" onClick={onToggleMenu} aria-label="Abrir navegación" aria-expanded={menuOpen}>{menuOpen ? <FiX /> : <FiMenu />}</button>
      <nav className={menuOpen ? "navigation is-open" : "navigation"} aria-label="Navegación principal">
        {links.map(([label, id]) => <a href={`#${id}`} key={id} onClick={onNavigate}>{label}</a>)}
        <button className="theme-toggle" onClick={onToggleTheme} aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}>{dark ? <FiSun /> : <FiMoon />}</button>
      </nav>
    </header>
  );
}

export default Header;
