import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home";
import Technologies from "./components/Technologies/Technologies";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function handleDarkModeToggle() {
    setDarkMode(!darkMode);
  }

  return (
    <BrowserRouter>
      <div className={darkMode ? "App dark-mode" : "App"}>
        {/* Agrega un botón que permita cambiar entre el modo claro y oscuro */}
        <button onClick={handleDarkModeToggle}>
          Cambiar a {darkMode ? "modo claro" : "modo oscuro"}
        </button>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/tecnologias"} element={<Technologies />} />
          <Route exact path={"/proyectos"} element={<Projects />} />
          <Route exact path={"/contactame"} element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;