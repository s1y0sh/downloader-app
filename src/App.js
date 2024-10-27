import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register'; // مسیر صحیح به فایل Register
import Login from './components/Login';   // مسیر صحیح به فایل Login
import Home from './pages/Home';          // مسیر صحیح به فایل Home
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', textAlign: 'center' }}>
        <h1 style={{ color: 'red' }}>My Downloader App</h1>
        <p>Welcome to the downloader app! Please log in to continue.</p>
        <Link to="/register">
          <button style={{ marginTop: '20px' }}>Register</button>
        </Link>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
