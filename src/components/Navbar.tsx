import React, { useState, useEffect } from 'react';
import { NavbarLink, MobileMenuOpen } from '../types';
import '../styles/global.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<MobileMenuOpen>(false);

  const navLinks: NavbarLink[] = [
    { id: '1', label: 'Home', href: '#home' },
    { id: '2', label: 'Services', href: '#services' },
    { id: '3', label: 'Gallery', href: '#gallery' },
    { id: '4', label: 'About', href: '#about' },
    { id: '5', label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavLinkClick = (href: string) => {
    closeMobileMenu();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavLinkClick('#home'); }}>
              <span className="logo-text">Re</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <ul className="navbar-menu">
            {navLinks.map((link) => (
              <li key={link.id} className="navbar-item">
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavLinkClick(link.href); }}
                  className="navbar-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-menu-list">
            {navLinks.map((link) => (
              <li key={link.id} className="mobile-menu-item">
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavLinkClick(link.href); }}
                  className="mobile-menu-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;