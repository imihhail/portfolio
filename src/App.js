import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from './components/projects';
import Home from "./components/home";
import NavBar from "./components/navbar";
import Models from "./components/models";
import Footer from "./components/footer";
import Contact from "./components/contact";

function App() {
  const [modelLoaded, setModelLoaded] = useState(false);

  return (
    <Router>
    <div className="container">
    <NavBar setModelLoaded={setModelLoaded} />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/projects" element={<Projects modelLoaded={modelLoaded}/>} />
          <Route path="/models" element={<Models />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default App;
