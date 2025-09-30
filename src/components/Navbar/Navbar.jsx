import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('token'); // check login status

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        closeMenu();
        navigate('/login');
    };

    const isActive = (path) => {
        if (path === '/home' || path === '/') {
            return location.pathname === '/' || location.pathname === '/home';
        }
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" onClick={closeMenu}>
                        <img src={logo} alt="Time Kids Hour" className="logo-image" />
                    </Link>
                </div>

                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
                            HOME
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/about" className={`navbar-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>
                            ABOUT US
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/programs" className={`navbar-link ${isActive('/programs') ? 'active' : ''}`} onClick={closeMenu}>
                            PROGRAMS
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/curriculum" className={`navbar-link ${isActive('/curriculum') ? 'active' : ''}`} onClick={closeMenu}>
                            CURRICULUM
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/media" className={`navbar-link ${isActive('/media') ? 'active' : ''}`} onClick={closeMenu}>
                            MEDIA
                        </Link>
                    </li>

                    {/* Blog link visible to all */}
                    <li className="navbar-item">
                        <Link to="/blog" className={`navbar-link ${isActive('/blog') ? 'active' : ''}`} onClick={closeMenu}>
                            BLOG
                        </Link>
                    </li>

                    <li className="navbar-item">
                        <Link to="/contact" className={`navbar-link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>
                            CONTACT US
                        </Link>
                    </li>

                    {/* Login / Logout */}
                    <li className="navbar-item">
                        {token ? (
                            <button className="navbar-link contact-link logout-btn" onClick={handleLogout}>
                                LOGOUT
                            </button>
                        ) : (
                            <Link to="/login" className={`navbar-link contact-link ${isActive('/login') ? 'active' : ''}`} onClick={closeMenu}>
                                LOGIN
                            </Link>
                        )}
                    </li>
                </ul>

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
