import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Projects from './components/projects';
import About from "./components/about";
import NavBar from "./components/navbar";
import Models from "./components/models";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
    <div className="container">
      <NavBar />
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/models" element={<Models />} />
        </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default App;
