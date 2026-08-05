import { useEffect, useRef, useState } from "react";
import "./App.css";
import Contact from "./components/portfolio/Contact";
import Education from "./components/portfolio/Education";
import Experience from "./components/portfolio/Experience";
import Header from "./components/portfolio/Header";
import Hero from "./components/portfolio/Hero";
import Intro from "./components/portfolio/Intro";
import Projects from "./components/portfolio/Projects";
import Skills from "./components/portfolio/Skills";

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (isNavigatingRef.current) {
        lastScrollY.current = currentY;
        return;
      }
      setHideHeader(currentY > lastScrollY.current && currentY > 96);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(navTimeoutRef.current);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleNavLinkClick = () => {
    closeMenu();
    isNavigatingRef.current = true;
    setHideHeader(false);
    clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => { isNavigatingRef.current = false; }, 1000);
  };

  return (
    <div className="site-shell">
      <Header
        dark={dark}
        hideHeader={hideHeader}
        menuOpen={menuOpen}
        onNavigate={handleNavLinkClick}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onToggleTheme={() => setDark(!dark)}
      />
      <main>
        <Hero />
        <Intro />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Contact />
    </div>
  );
}

export default App;
