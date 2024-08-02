// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav className="bg-gray-800 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Braudana</h1>
        <h3 className="text-2xl font-bold">test</h3>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about-contact" className="hover:underline">About & Contact</Link></li>
        <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
