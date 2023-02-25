import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Technologies from "./components/Technologies/Technologies.jsx";
import Projects from "./components/Projects/Projects.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route exact path={"/"} element={<Home/>} />
        <Route exact path={"/tecnologias"} element={<Technologies/>} />
        <Route exact path={"/proyectos"} element={<Projects/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
