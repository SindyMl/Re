import React from 'react';
import { NavbarLink } from '../types';
import '../styles/global.css';

const Footer: React.FC = () => {
  const navLinks: NavbarLink[] = [
    { id: '1', label: 'Home', href: '#home' },
    { id: '2', label: 'Services', href: '#services' },
    { id: '3', label: 'Gallery', href: '#gallery' },
    { id: '4', label: 'About', href: '#about' },
    { id: '5', label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { id: '1', name: 'Instagram', icon: '📷', url: '#' },
    { id: '2', name: 'Facebook', icon: '📘', url: '#' },
    { id: '3', name: 'Twitter', icon: '🐦', url: '#' },
    { id: '4', name: 'WhatsApp', icon: '💬', url: '#' },
  ];

  const handleNavLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">Re</span>
            </div>
            <p className="footer-tagline">
              Elevate your beauty with expert hair braiding and lash services
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  className="social-link"
                  aria-label={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.id} className="footer-link-item">
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavLinkClick(link.href); }}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#services" className="footer-link">Box Braids</a>
              </li>
              <li className="footer-link-item">
                <a href="#services" className="footer-link">Cornrows</a>
              </li>
              <li className="footer-link-item">
                <a href="#services" className="footer-link">Lash Extensions</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">House No. 389 Alpheus Manthape St, Nancefield, Musina</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="contact-text">076 514 0211</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span className="contact-text">mudetorenee@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Re Beauty Salon. All rights reserved.
            </p>
            <p className="footer-credit">
              Designed with 💜 for beauty enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;