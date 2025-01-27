import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './components/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registerpage" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
