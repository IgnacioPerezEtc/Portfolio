import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin } from "react-icons/fi";

const email = "nachoperezetc@gmail.com";

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return <footer className="footer" id="contacto" style={{ paddingTop: "4.5rem" }}>
    <p className="section-label" style={{ fontSize: ".9rem", letterSpacing: ".12em" }}>Contacto</p>
    <h2 style={{ margin: ".7rem 0 1.6rem", fontSize: "clamp(1.65rem, 3vw, 2.45rem)", letterSpacing: "-.045em" }}>Correo electrónico</h2>
    <div className="contact-actions"><a className="mail-link" href={`mailto:${email}`}>{email} <FiArrowUpRight /></a><button className="copy-button" onClick={copyEmail}>{copied ? <><FiCheck /> Correo copiado</> : <><FiCopy /> Copiar correo</>}</button></div>
    <div className="footer-bottom" style={{ marginTop: "4.5rem" }}><span>© {new Date().getFullYear()} Ignacio Pérez Etchegaray</span><div><a href="https://github.com/IgnacioPerezEtc" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="https://www.linkedin.com/in/ignacio-perez-etchegaray-0858b724a/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div></div>
  </footer>;
}

export default Contact;
