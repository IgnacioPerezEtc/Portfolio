import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Technologies from "./components/Technologies/Technologies.jsx";
import Projects from "./components/Projects/Projects.jsx";
import "./DarkMode.css";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
      <div className={isDarkMode ? "App DarkMode" : "App"}>
        <Routes>
          <Route
            exact
            path={"/"}
            element={
              <Home
                handleDarkModeToggle={handleDarkModeToggle}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            }
          />
          <Route exact path={"/tecnologias"} element={<Technologies />} />
          <Route exact path={"/proyectos"} element={<Projects />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
