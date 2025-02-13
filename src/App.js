import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Projects from './components/projects';
import Home from "./components/home";
import NavBar from "./components/navbar";
import Models from "./components/models";
import Footer from "./components/footer";
import Contact from "./components/contact";

function App() {
  return (
    <Router>
    <div className="container">
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/projects" element={<Projects />} />
          <Route path="/models" element={<Models />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default App;
