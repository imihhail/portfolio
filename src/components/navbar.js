import { Link } from "react-router-dom";
import './navbar.css';

export default function NavBar() {
  return (
    <nav className="navSection">
      <div className="sectionsLinks">
        <Link to="/" className="">Projects</Link>
        <Link to="/models" className="">3D Models</Link>
        <Link to="/contact" className="">Contact</Link>
        <Link to="/about" className="">About</Link>
      </div>
    </nav>
  );
}
