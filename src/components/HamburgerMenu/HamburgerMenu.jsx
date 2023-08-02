// HamburgerMenu.js
import React, { useState } from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div
        className={`hamburger-icon ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isOpen && (
        <div className="menu-links">
          {/* Add your menu links here */}
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
