# Formulario de contacto (EmailJS) + animaciones on-scroll (Framer Motion)

## Contexto

`client/src/App.jsx` es la SPA de una sola página que efectivamente se sirve (montada desde `client/src/main.jsx`). Los componentes en `client/src/components/{About,Projects,NavBar,...}` pertenecen a una versión previa basada en rutas y no se importan desde ningún punto de entrada activo — quedan fuera de alcance de este trabajo.

Dos features independientes, agrupadas en un mismo spec por ser pequeñas y tocar la misma página:

1. Reemplazar el bloque de contacto actual (mailto + copiar email) por un formulario funcional que envía mails vía EmailJS.
2. Animar la entrada de las secciones principales al hacer scroll, con Framer Motion.

El estilizado de ambas features queda a cargo del usuario después de la implementación funcional — el trabajo de este spec es la lógica y el markup base, sin CSS nuevo salvo el mínimo indispensable para que el form sea usable.

## 1. Formulario de contacto

### Componente

`client/src/components/ContactForm/ContactForm.jsx` — nuevo, sin CSS module. Usa clases planas (`contact-form`, `form-field`, `form-status`, etc.) consistentes con el patrón de `App.css` que ya usa `App.jsx`.

Reemplaza el contenido de `<footer id="contacto">` en `App.jsx` (líneas 178-185): se retiran el link `mailto` y el botón "copiar correo"; el formulario pasa a ser la única vía de contacto en esa sección.

### Campos y validación

- Campos: `name`, `email`, `message` (los tres requeridos).
- Validación en cliente antes de enviar: campos no vacíos, `email` con formato válido (regex simple o `input type="email"` + chequeo en submit).
- Sin límite de longitud especial ni campos opcionales (asunto descartado).

### Envío

- Librería `@emailjs/browser` (nueva dependencia).
- `emailjs.send(serviceId, templateId, { from_name, from_email, message }, publicKey)`, usando los nombres de variables `from_name`, `from_email`, `message` — deben coincidir con el template de EmailJS ya configurado por el usuario (`template_kctdwcb`).
- Credenciales desde variables de entorno Vite: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, leídas con `import.meta.env`. Ya cargadas en `client/.env` (gitignorado) con los valores reales; `client/.env.example` documenta las claves sin valores para quien clone el repo. En Vercel, el usuario debe cargar las mismas 3 env vars en la configuración del proyecto para que el build de producción las tenga disponibles.
- No hace falta backend/serverless: el public key de EmailJS está diseñado para uso en cliente; la restricción de abuso se maneja restringiendo dominios permitidos desde el dashboard de EmailJS (paso manual del usuario, fuera de este spec).

### Estados y manejo de errores

- Estado local: `idle | sending | success | error`.
- Botón de submit deshabilitado mientras `sending`.
- Éxito: mensaje inline ("Mensaje enviado") y el formulario se limpia.
- Error (rechazo de EmailJS, red caída, etc.): mensaje inline de error, el formulario conserva lo escrito para que el usuario pueda reintentar sin volver a tipear.
- Validación fallida (campo vacío / email inválido): mensaje de error inline, no se llama a `emailjs.send`.

## 2. Animaciones on-scroll

### Componente

`client/src/components/Reveal/Reveal.jsx` — wrapper reutilizable, responsabilidad única: animar su contenido con fade + slide-up cuando entra en viewport.

Props: `as` (tag a renderizar, default `"div"`), y el resto de props (`className`, `id`, children, etc.) se reenvían al elemento renderizado. Internamente usa `motion[as]` de `framer-motion` para no introducir un wrapper DOM extra que rompa anchors (`#experiencia`, `#proyectos`, etc.) ni el CSS existente.

Comportamiento:
- `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, amount: 0.2 }}` — la animación se dispara una sola vez, la primera vez que la sección entra en pantalla.
- Variants: `hidden: { opacity: 0, y: 24 }`, `visible: { opacity: 1, y: 0 }`, transición ~0.5s ease-out.
- Accesibilidad: usa el hook `useReducedMotion` de `framer-motion`; si el usuario tiene `prefers-reduced-motion` activado, se renderiza sin animar (variants sin desplazamiento/opacidad, o transición de duración 0).

### Uso

Envuelve las 7 secciones principales de `App.jsx`: hero (`#inicio`), perfil/intro, experiencia (`#experiencia`), proyectos (`#proyectos`), stack (`#stack`), formación, y el footer de contacto (`#contacto`). Cada `<section ...>` pasa a ser `<Reveal as="section" ...>` conservando `id` y `className` tal como están hoy.

Dependencia nueva: `framer-motion`.

## Testing / verificación

No hay test suite en el proyecto (`package.json` no define script `test`). Verificación manual con `npm run dev`:
- Enviar el formulario con datos válidos → confirmar que llega el mail y se muestra el estado de éxito.
- Enviar con un campo vacío / email inválido → confirmar que no se llama a EmailJS y se muestra el error de validación.
- Simular un fallo de red o credenciales inválidas → confirmar que se muestra el estado de error sin perder lo tipeado.
- Scrollear la página completa → confirmar que las 7 secciones animan una vez al entrar en viewport y no se re-disparan al volver a pasar por ellas.
- Verificar que los anchors del navbar (`#experiencia`, `#proyectos`, `#stack`, `#contacto`) siguen funcionando con las secciones convertidas a `Reveal`.
- Activar "reduce motion" en el SO/navegador y confirmar que las secciones aparecen sin animación.

## Fuera de alcance

- Estilizado visual del formulario y de las animaciones (lo hace el usuario después).
- Backend/serverless propio para el envío de mails.
- Campo de "asunto" en el formulario.
- Tocar los componentes legacy (`About`, `Projects` con router, `NavBar` con router) — no están en uso.
