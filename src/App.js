import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Projects from './components/projects';
import About from "./components/about";
import NavBar from "./components/navbar";
import Models from "./components/models";

function App() {
  return (
    <Router>
      <NavBar />
    
        <Routes>
          {/* <Route path="/registerpage" element={<RegisterPage />} /> */}
          <Route path="/" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/models" element={<Models />} />
        </Routes>
 
    </Router>
  );
}

export default App;
