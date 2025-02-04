import { Link } from "react-router-dom";
import './navbar.css';

export default function NavBar() {
  return (
    <>
      <nav className="navSection">
        <div className="sectionsLinks">
          <Link to="/">Projects</Link>
          <Link to="/models">3D Models</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
          <div className="topLine"></div>
      </nav>
    </>
  );
}
