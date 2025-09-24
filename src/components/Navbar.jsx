import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Learning Hub
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-links">Courses</Link>
          </li>
          {/* Add this new list item for the Contest link */}
          <li className="nav-item">
            <Link to="/contest" className="nav-links">Contest</Link>
          </li>
          
          {user ? (
            <>
              <li className="nav-item nav-user">
                Welcome, {user.fullName}
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links-btn">Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links-btn">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;