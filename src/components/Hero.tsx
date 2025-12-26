import React from 'react';
import '../styles/global.css';

const Hero: React.FC = () => {
  const handleBookNow = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      // Scroll to contact section with offset for fixed navbar
      const navbarHeight = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text fade-in">
            <h1 className="hero-title">
              Elevate Your Look at <span className="brand-name">Re</span>
            </h1>
            <p className="hero-subtitle">
              Expert Hair Braiding and Lashes
            </p>
            <p className="hero-description">
              Discover the art of beauty with our premium services including box braids, cornrows,
              faux locs, and professional lash installations. Where elegance meets expertise.
            </p>
            <button
              className="btn hero-btn"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
          <div className="hero-image">
            <img
              src="/logo.jpeg"
              alt="Re Beauty Salon"
              className="hero-logo-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;