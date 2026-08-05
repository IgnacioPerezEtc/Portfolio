# Contact Form (EmailJS) + Scroll Animations (Motion) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mailto/copy-email contact block in `client/src/App.jsx` with a working EmailJS contact form, and add scroll-triggered reveal animations to the page's main sections using Motion (the current name/package for what used to be published as `framer-motion`).

**Architecture:** Two small, independent, single-purpose components — `ContactForm` (form state, validation, EmailJS submission) and `Reveal` (a generic `whileInView` animation wrapper that can render as any HTML tag) — wired into the existing single-file `App.jsx` page. No backend: EmailJS is called directly from the browser using credentials from Vite env vars already set up in `client/.env`.

**Tech Stack:** React 18, Vite. New dependencies: `@emailjs/browser` (EmailJS SDK) and `motion` (the current package name for the Motion/Framer Motion animation library — imported as `motion/react`).

**Important constraint:** Per user instruction, **do not run `git commit`** while executing this plan. Each task ends with "stop and let the user review the diff" instead of a commit step — the user commits personally.

---

## Note on `framer-motion` vs `motion`

The design spec (`docs/superpowers/specs/2026-08-04-contact-form-and-scroll-animations-design.md`) refers to the library by its product name, "Framer Motion". The library has since been rebranded to "Motion", and its current npm package for React is `motion` (imported from `"motion/react"`), not the legacy `framer-motion` package. This plan installs and uses `motion` — same library, current package name. Confirmed against current Motion docs (motion.dev) via Context7 before writing this plan.

---

### Task 1: Install dependencies

**Files:**
- Modify: `client/package.json` (via npm, not by hand)

- [ ] **Step 1: Install the EmailJS SDK and Motion**

Run from the `client` directory:

```bash
cd client
npm install @emailjs/browser motion
```

- [ ] **Step 2: Verify the install**

Run: `npm ls @emailjs/browser motion`
Expected: both packages listed with resolved version numbers, no `UNMET DEPENDENCY` errors.

- [ ] **Step 3: Stop and let the user review**

Show the diff of `client/package.json` and `client/package-lock.json`. Do not commit.

---

### Task 2: Create the `Reveal` component

**Files:**
- Create: `client/src/components/Reveal/Reveal.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { motion, useReducedMotion } from "motion/react";

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ as = "div", delay = 0, children, ...rest }) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
```

Notes for whoever implements this:
- `motion[as]` works because `motion` exposes every standard HTML tag (`motion.div`, `motion.section`, `motion.footer`, ...) as a stable property — this is not `motion.create()`, which is a different API for custom/non-standard elements and isn't needed here since we only render standard tags (`div`, `section`, `footer`).
- When `shouldReduceMotion` is true, `duration: 0` makes the state change instant (no visible motion) instead of swapping to a different set of variants — simpler, same accessibility outcome.
- `{...rest}` forwards `className`, `id`, `style`, `aria-*`, etc. straight to the rendered tag, so callers use it exactly like the native element.

- [ ] **Step 2: Verify it compiles**

Run: `npm run dev` (from `client/`)
Expected: Vite starts with no errors (this component isn't used anywhere yet, so there's nothing to see in the browser — that happens in Task 3).

- [ ] **Step 3: Stop and let the user review**

Show `client/src/components/Reveal/Reveal.jsx`. Do not commit.

---

### Task 3: Wrap the page's sections with `Reveal`

**Files:**
- Modify: `client/src/App.jsx`
- Modify: `client/src/App.css`

**Context:** `App.css:12` already has a CSS-only fade-in that runs once on mount:

```css
@media (prefers-reduced-motion: no-preference) { .section { animation: fade-in .6s both; } @keyframes fade-in { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } } }
```

Every element with class `section` gets this animation at DOM creation — not on scroll. Since the page renders all sections immediately (no lazy mounting), this means all sections below the fold already finish "fading in" (while invisible, off-screen) within 0.6s of page load. If left in place, it will fight visually with the new `Reveal` scroll-trigger (both writing to `opacity`/`transform` on the same elements) and defeat the point of scroll-triggered reveal below the fold. **Remove this rule** — `Reveal` replaces it.

- [ ] **Step 1: Remove the conflicting mount-fade CSS**

In `client/src/App.css`, delete line 12 in full:

```css
@media (prefers-reduced-motion: no-preference) { .section { animation: fade-in .6s both; } @keyframes fade-in { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } } }
```

- [ ] **Step 2: Import `Reveal` in App.jsx**

In `client/src/App.jsx`, find:

```jsx
import portrait from "./assets/img/foto.jpg";
import hotelVideo from "./assets/video/proyectofinal.mp4";
import "./App.css";
```

Replace with:

```jsx
import portrait from "./assets/img/foto.jpg";
import hotelVideo from "./assets/video/proyectofinal.mp4";
import Reveal from "./components/Reveal/Reveal.jsx";
import "./App.css";
```

- [ ] **Step 3: Wrap the hero section**

Find:

```jsx
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
```

Replace with the same content, but the outer tag is `Reveal`:

```jsx
        <Reveal as="section" className="hero section" id="inicio">
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
        </Reveal>
```

- [ ] **Step 4: Wrap the intro section**

Find:

```jsx
        <section className="intro section" aria-label="Perfil profesional">
          <p className="section-label">Perfil</p>
          <p>Full Stack Developer con más de tres años de experiencia desarrollando aplicaciones web, APIs y sistemas institucionales para el Ministerio de Educación de la Provincia de Buenos Aires.</p>
        </section>
```

Replace with:

```jsx
        <Reveal as="section" className="intro section" aria-label="Perfil profesional">
          <p className="section-label">Perfil</p>
          <p>Full Stack Developer con más de tres años de experiencia desarrollando aplicaciones web, APIs y sistemas institucionales para el Ministerio de Educación de la Provincia de Buenos Aires.</p>
        </Reveal>
```

- [ ] **Step 5: Wrap the experience section**

Find:

```jsx
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
```

Replace with the same content wrapped in `Reveal`:

```jsx
        <Reveal as="section" className="section experience" id="experiencia">
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
        </Reveal>
```

- [ ] **Step 6: Wrap the projects section**

Find:

```jsx
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
```

Replace with:

```jsx
        <Reveal as="section" className="section projects" id="proyectos">
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
        </Reveal>
```

- [ ] **Step 7: Wrap the skills section**

Find:

```jsx
        <section className="section skills" id="stack">
          <div className="section-heading"><p className="section-label">Stack tecnológico</p><h2>Herramientas para cada capa del producto.</h2></div>
          <div className="skills-grid">
            {Object.entries(stack).map(([area, items]) => <article className="skill-group" key={area}><h3><FiCode /> {area}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}
          </div>
        </section>
```

Replace with:

```jsx
        <Reveal as="section" className="section skills" id="stack">
          <div className="section-heading"><p className="section-label">Stack tecnológico</p><h2>Herramientas para cada capa del producto.</h2></div>
          <div className="skills-grid">
            {Object.entries(stack).map(([area, items]) => <article className="skill-group" key={area}><h3><FiCode /> {area}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}
          </div>
        </Reveal>
```

- [ ] **Step 8: Wrap the education section**

Find:

```jsx
        <section className="section education">
          <p className="section-label">Formación</p>
          <div className="education-grid"><div><span>2025 — actualidad</span><h3>Licenciatura en Ciencia de Datos</h3><p>Universidad Nacional de La Plata</p></div><div><span>Finalizado en 2023</span><h3>Desarrollador Full Stack</h3><p>Henry</p></div><div><span>Idiomas</span><h3>Español (nativo) · Inglés (intermedio)</h3></div></div>
        </section>
```

Replace with:

```jsx
        <Reveal as="section" className="section education">
          <p className="section-label">Formación</p>
          <div className="education-grid"><div><span>2025 — actualidad</span><h3>Licenciatura en Ciencia de Datos</h3><p>Universidad Nacional de La Plata</p></div><div><span>Finalizado en 2023</span><h3>Desarrollador Full Stack</h3><p>Henry</p></div><div><span>Idiomas</span><h3>Español (nativo) · Inglés (intermedio)</h3></div></div>
        </Reveal>
```

- [ ] **Step 9: Wrap the footer (contact section)**

Find:

```jsx
      <footer className="footer" id="contacto" style={{ paddingTop: "4.5rem" }}>
```

Replace with:

```jsx
      <Reveal as="footer" className="footer" id="contacto" style={{ paddingTop: "4.5rem" }}>
```

And find the matching closing tag:

```jsx
      </footer>
```

Replace with:

```jsx
      </Reveal>
```

(The footer's inner content — the mailto link and copy button — stays untouched here; Task 5 replaces it with `ContactForm`.)

- [ ] **Step 10: Manually verify in the browser**

Run: `npm run dev` (from `client/`), open the printed local URL (default `http://localhost:5173`).

Expected:
- On load, the hero section is visible/animated in (it's already in the viewport).
- Scroll down slowly: "Perfil", "Experiencia", "Proyectos", "Stack tecnológico", "Formación" and the footer each fade + slide up into place the first time they enter the viewport, and do **not** re-animate if you scroll back up and down again over them.
- Click each navbar link (`Experiencia`, `Proyectos`, `Stack`, `Contacto`) and confirm the page still jumps to the right anchor (`#experiencia`, `#proyectos`, `#stack`, `#contacto`).
- In your OS/browser accessibility settings, enable "reduce motion", reload the page, and confirm sections simply appear with no fade/slide instead of animating.

- [ ] **Step 11: Stop and let the user review**

Show the diff of `client/src/App.jsx` and `client/src/App.css`. Do not commit.

---

### Task 4: Create the `ContactForm` component

**Files:**
- Create: `client/src/components/ContactForm/ContactForm.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      return "Completá todos los campos.";
    }
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      return "Ingresá un email válido.";
    }
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
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: values.name, from_email: values.email, message: values.message },
        PUBLIC_KEY
      );
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setError("No se pudo enviar el mensaje. Probá de nuevo en unos minutos.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="contact-name">Nombre</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          disabled={status === "sending"}
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          disabled={status === "sending"}
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          disabled={status === "sending"}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
      {status === "error" && <p className="form-status form-status--error">{error}</p>}
      {status === "success" && (
        <p className="form-status form-status--success">Mensaje enviado, ¡gracias! Te voy a responder pronto.</p>
      )}
    </form>
  );
}

export default ContactForm;
```

Notes for whoever implements this:
- `from_name` / `from_email` / `message` must match the variable names used in the EmailJS template (`template_kctdwcb`), which was set up with exactly those three variables — if the template uses different names, update the object passed to `emailjs.send` here to match.
- On validation failure or a failed send, `values` is left untouched so the user doesn't lose what they typed. Only a successful send clears the form.

- [ ] **Step 2: Verify it compiles**

Run: `npm run dev` (from `client/`)
Expected: Vite starts with no errors (not wired into `App.jsx` yet, so nothing changes in the browser — that's Task 5).

- [ ] **Step 3: Stop and let the user review**

Show `client/src/components/ContactForm/ContactForm.jsx`. Do not commit.

---

### Task 5: Wire `ContactForm` into the page, remove the old mailto/copy UI

**Files:**
- Modify: `client/src/App.jsx`
- Modify: `client/src/App.css`

- [ ] **Step 1: Import `ContactForm` and drop now-unused icon imports**

Find:

```jsx
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
import Reveal from "./components/Reveal/Reveal.jsx";
import "./App.css";
```

Replace with (drops `FiCheck` and `FiCopy`, which were only used by the copy-email button being removed; adds the `ContactForm` import):

```jsx
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
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
import Reveal from "./components/Reveal/Reveal.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import "./App.css";
```

- [ ] **Step 2: Remove the `copied` state and `copyEmail` function**

Find:

```jsx
  const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
```

Replace with:

```jsx
  const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
```

Find:

```jsx
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
```

Replace with:

```jsx
  return (
```

- [ ] **Step 3: Replace the footer's contact UI with `ContactForm`**

Find:

```jsx
      <Reveal as="footer" className="footer" id="contacto" style={{ paddingTop: "4.5rem" }}>
        <p className="section-label" style={{ fontSize: ".9rem", letterSpacing: ".12em" }}>Contacto</p>
        <h2 style={{ margin: ".7rem 0 1.6rem", fontSize: "clamp(1.65rem, 3vw, 2.45rem)", letterSpacing: "-.045em" }}>Correo electrónico</h2>
        <div className="contact-actions">
          <a className="mail-link" href="mailto:nachoperezetc@gmail.com">nachoperezetc@gmail.com <FiArrowUpRight /></a>
          <button className="copy-button" onClick={copyEmail}>{copied ? <><FiCheck /> Correo copiado</> : <><FiCopy /> Copiar correo</>}</button>
        </div>
        <div className="footer-bottom" style={{ marginTop: "4.5rem" }}><span>© {new Date().getFullYear()} Ignacio Pérez Etchegaray</span><div><a href="https://github.com/IgnacioPerezEtc" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="https://www.linkedin.com/in/ignacio-perez-etchegaray-0858b724a/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div></div>
      </Reveal>
```

Replace with:

```jsx
      <Reveal as="footer" className="footer" id="contacto" style={{ paddingTop: "4.5rem" }}>
        <p className="section-label" style={{ fontSize: ".9rem", letterSpacing: ".12em" }}>Contacto</p>
        <h2 style={{ margin: ".7rem 0 1.6rem", fontSize: "clamp(1.65rem, 3vw, 2.45rem)", letterSpacing: "-.045em" }}>Escribime</h2>
        <ContactForm />
        <div className="footer-bottom" style={{ marginTop: "4.5rem" }}><span>© {new Date().getFullYear()} Ignacio Pérez Etchegaray</span><div><a href="https://github.com/IgnacioPerezEtc" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="https://www.linkedin.com/in/ignacio-perez-etchegaray-0858b724a/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div></div>
      </Reveal>
```

- [ ] **Step 4: Remove now-dead CSS and add the minimum needed to make the form usable**

In `client/src/App.css`, find (this is a fragment of the larger line 10 rule block — match and remove only this part):

```css
.contact-actions { display:flex; align-items:center; flex-wrap:wrap; gap:1rem; }.mail-link { color:var(--accent); border-bottom:1px solid var(--accent); padding-bottom:.2rem; font-size:clamp(1rem, 2vw, 1.4rem); }.copy-button { color:var(--text); background:transparent; border:0; display:flex; align-items:center; gap:.4rem; font-size:.8rem; }
```

Delete it (these three classes styled the removed mailto link and copy button — nothing else uses them).

Then, at the end of `client/src/App.css`, append this minimal block so the form is usable before the user does their own styling pass:

```css
.contact-form { display:flex; flex-direction:column; gap:1rem; max-width:520px; margin-top:1.5rem; }
.form-field { display:flex; flex-direction:column; gap:.4rem; }
.form-field label { font-size:.8rem; color:var(--muted); }
.form-field input, .form-field textarea { font:inherit; color:var(--text); background:var(--surface); border:1px solid var(--line); padding:.7rem .8rem; }
.form-field input:disabled, .form-field textarea:disabled { opacity:.6; }
.form-actions { display:flex; }
.form-status { margin:0; font-size:.85rem; }
.form-status--error { color:#e0685f; }
.form-status--success { color:var(--accent); }
```

- [ ] **Step 5: Manually verify in the browser**

Run: `npm run dev` (from `client/`), open the printed local URL, scroll to "Contacto".

Test 1 — validation error:
- Leave all fields empty, click "Enviar mensaje".
- Expected: "Completá todos los campos." appears, no network request is made (check the Network tab — no request to `api.emailjs.com`).

Test 2 — invalid email:
- Fill Nombre and Mensaje, put `not-an-email` in Email, submit.
- Expected: "Ingresá un email válido." appears, no network request.

Test 3 — successful send:
- Fill all three fields with real values, submit.
- Expected: button shows "Enviando...", then "Mensaje enviado, ¡gracias! Te voy a responder pronto." appears, the three fields clear, and the email arrives at `nachoperezetc@gmail.com` (check the inbox — EmailJS delivery can take up to a minute).

Test 4 — send failure:
- Temporarily change `VITE_EMAILJS_PUBLIC_KEY` in `client/.env` to an invalid value, restart `npm run dev`, submit the form with valid data.
- Expected: "No se pudo enviar el mensaje. Probá de nuevo en unos minutos." appears, the typed values remain in the fields.
- Restore the correct `VITE_EMAILJS_PUBLIC_KEY` value afterwards and restart `npm run dev` again.

- [ ] **Step 6: Stop and let the user review**

Show the diff of `client/src/App.jsx` and `client/src/App.css`. Do not commit.

---

## Plan self-review notes

- **Spec coverage:** form fields/validation (Task 4), form replaces mailto/copy UI (Task 5), EmailJS env vars already in place (done during brainstorming, referenced in Task 4), Reveal wrapping all 7 sections (Task 3), `prefers-reduced-motion` handling (Task 2), manual verification in place of automated tests (Tasks 3 & 5) — all spec sections are covered.
- **Extra finding folded in:** the pre-existing CSS mount-fade animation on `.section` (`App.css:12`) would conflict with the new scroll-triggered `Reveal` animation; Task 3 removes it. This wasn't in the original spec because it was only discovered while mapping out the actual file changes — it's a direct, necessary consequence of the approved design, not a scope change.
- **Package naming:** the spec says "Framer Motion"; this plan installs `motion` (current package name, confirmed via Context7 against current Motion docs) and calls that out explicitly so it isn't read as a deviation.
- **No commits in this plan:** per explicit user instruction, every task ends with a manual review checkpoint instead of a `git commit` step.
