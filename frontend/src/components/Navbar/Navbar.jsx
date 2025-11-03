import React from 'react';
import { useState } from 'react';
import { useUser } from '../../context.jsx';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo/Brand */}
      <Link to="/" className="navbar-brand">
        JobSeeker
      </Link>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Navigation Links */}
      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/jobs" className="nav-link">
          Find Jobs
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        <Link to="/applications" className="nav-link">
          Applications
        </Link>

        {/* User Menu */}
        {user ? (
          <div className="user-menu">
            <img 
              src={user.image || '/default-avatar.png'} 
              alt="Profile" 
              className="user-avatar"
            />
            <div className="user-dropdown">
              <Link to="/profile" className="dropdown-item">
                My Profile
              </Link>
              <Link to="/settings" className="dropdown-item">
                Settings
              </Link>
              <button onClick={logout} className="dropdown-item">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
// This Navbar component is a simple navigation bar that includes links to different pages of the application.
// It uses the Link component from React Router to navigate between pages.