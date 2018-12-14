import React from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';

const Header = () => {
  return (
    <nav
      className="navbar has-background-black-bis"
      role="navigation"
      aria-label="main navigation"
    >
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item has-text-grey-light">
            Home
          </Link>
          <Link to="/my_experience" className="navbar-item has-text-grey-light">
            Career
          </Link>
          <Link to="/my_education" className="navbar-item has-text-grey-light">
            Education
          </Link>
          <Link to="/projects" className="navbar-item has-text-grey-light">
            Projects
          </Link>
          <Link to="/services" className="navbar-item has-text-grey-light">
            Services
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
