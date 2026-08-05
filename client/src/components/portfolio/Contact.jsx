import { FiGithub, FiLinkedin } from "react-icons/fi";
import ContactForm from "../ContactForm/ContactForm";

function Contact() {
  return <footer className="footer" id="contacto" style={{ paddingTop: "4.5rem" }}>
    <p className="section-label" style={{ fontSize: ".9rem", letterSpacing: ".12em" }}>Contacto</p>
    <h2 style={{ margin: ".7rem 0 1.6rem", fontSize: "clamp(0.65rem, 3vw, 1.85rem)", letterSpacing: "-.045em" }}>Escribime</h2>
    <ContactForm />
    <div className="footer-bottom" style={{ marginTop: "4.5rem" }}><span>© {new Date().getFullYear()} Ignacio Pérez Etchegaray</span><div><a href="https://github.com/IgnacioPerezEtc" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="https://www.linkedin.com/in/ignacio-perez-etchegaray-0858b724a/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div></div>
  </footer>;
}

export default Contact;
