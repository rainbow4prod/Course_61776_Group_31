// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AboutAndContact from './components/AboutAndContact';
import FAQ from './components/FAQ';
import './App.css';

function App() {
  return (
    <Router basename="/braudana/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-contact" element={<AboutAndContact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
