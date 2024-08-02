// src/components/ThemeToggle.js
import React, { useState, useEffect } from 'react';
import '../App.css'; // Ensure this import is present

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
    document.body.classList.toggle('light', darkMode);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    document.body.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="bg-gray text-white py-2">
      <div className="container mx-auto flex justify-end">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn p-2 rounded-full"
        >
          <img
            src={darkMode ? 'pictures/sun.png' : 'pictures/moon.png'}
            alt="Toggle Theme"
            width="24"
            height="24"
          />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
