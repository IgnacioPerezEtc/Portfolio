import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emptyValues = { name: "", email: "", message: "" };

function ContactForm() {
  const [values, setValues] = useState(emptyValues);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const validate = () => {
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) return "Completá todos los campos.";
    if (!EMAIL_PATTERN.test(values.email.trim())) return "Ingresá un email válido.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setError(validationError);
      return;
    }

    setStatus("sending");
    setError("");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: values.name,
        from_email: values.email,
        message: values.message,
      }, PUBLIC_KEY);
      setStatus("success");
      setValues(emptyValues);
    } catch {
      setStatus("error");
      setError("No se pudo enviar el mensaje. Probá de nuevo en unos minutos.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="contact-name">Nombre</label>
        <input id="contact-name" name="name" type="text" value={values.name} onChange={handleChange} disabled={status === "sending"} />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" value={values.email} onChange={handleChange} disabled={status === "sending"} />
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea id="contact-message" name="message" rows={5} value={values.message} onChange={handleChange} disabled={status === "sending"} />
      </div>
      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Enviar mensaje"}</button>
      </div>
      {status === "error" && <p className="form-status form-status--error" role="alert">{error}</p>}
      {status === "success" && <p className="form-status form-status--success" role="status">Mensaje enviado, ¡gracias! Te voy a responder pronto.</p>}
    </form>
  );
}

export default ContactForm;
