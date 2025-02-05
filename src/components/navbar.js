import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

export default function NavBar() {
  const [flickering, setFlickering] = useState(false);
  const [flickering2, setFlickering2] = useState(false);
  const [flickering3, setFlickering3] = useState(false);
  const [lineFlash, setLineFlash] = useState(false);

  function flickerCycle() {
    setFlickering(false);
    setFlickering2(false);
    setFlickering3(false);
    setLineFlash(false)
    setTimeout(() =>  setLineFlash(true), 300);
    setTimeout(() => setFlickering(true), 500);
    setTimeout(() => setFlickering2(true), 700);
    setTimeout(() => setFlickering3(true), 900);
  }

  useEffect(() => {
    const intervalId = setInterval(flickerCycle, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="navSection">
      <div className="sectionsLinks">
        <Link to="/">
          Proj
          <span className={`${flickering ? "flicker1" : ""}`}>e</span>
          cts
        </Link>
        <Link to="/models">
          3D Model<span className={`${flickering2 ? "flicker2" : ""}`}>s</span>
        </Link>
        <Link to="/about">About</Link>
        <Link to="/contact">
          Cont
          <span className={`${flickering3 ? "flicker3" : ""}`}>a</span>
          ct
        </Link>
      </div>
      <div className="topLine"></div>
      <div className={`topLineShining ${lineFlash ? "zap" : ""}`}></div>
    </nav>
  );
}
