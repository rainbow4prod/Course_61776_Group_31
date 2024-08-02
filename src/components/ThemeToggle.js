import React, { useState, useEffect } from 'react';
import '../App.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.classList.toggle('dark', nextTheme === 'dark');
    document.body.classList.toggle('light', nextTheme === 'light');
    localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new Event('themechange')); // Dispatch custom event
  };

  useEffect(() => {
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="bg-gray text-white py-2">
      <div className="container mx-auto flex justify-end">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn p-2 rounded-full"
        >
          <img
            src={theme === 'dark' ? 'pictures/sun.png' : 'pictures/moon.png'}
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
