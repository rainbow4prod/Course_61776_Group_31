// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NavBar = () => (
  <nav className="bg-gray-700 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-4xl font-bold">Braudana</h1>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about-contact" className="hover:underline">About & Contact</Link></li>
        <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
      </ul>
    </div>
      <div className="container mx-auto flex justify-between items-center">
          <h5 className="text-1xl">like Grafana ... but better</h5>
          <ThemeToggle />
          </div>
  </nav>
);

export default NavBar;
