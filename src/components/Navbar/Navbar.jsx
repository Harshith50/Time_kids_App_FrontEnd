// Navbar.jsx - Using React Router Links
import  { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Function to check if current path matches the link
    const isActive = (path) => {
        if (path === '/home' || path === '/') {
            return location.pathname === '/' || location.pathname === '/home';
        }
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <Link to="/" onClick={closeMenu}>
                        <img 
                            src={logo} 
                            alt="Time Kids Hour" 
                            className="logo-image"
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <Link 
                            to="/" 
                            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            HOME
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/about" 
                            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            ABOUT US
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/programs" 
                            className={`navbar-link ${isActive('/programs') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            PROGRAMS
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/curriculum" 
                            className={`navbar-link ${isActive('/curriculum') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            CURRICULUM
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/media" 
                            className={`navbar-link ${isActive('/media') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            MEDIA
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/blog" 
                            className={`navbar-link ${isActive('/blog') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            BLOG
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/contact" 
                            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            CONTACT US
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/login" 
                            className={`navbar-link contact-link ${isActive('/login') ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            LOGIN
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="navbar-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;