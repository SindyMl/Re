import React from 'react';
import '../styles/global.css';

const Hero: React.FC = () => {
  const handleBookNow = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
            <div className="hero-image-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">✨</div>
                <p>Beautiful Hair & Lashes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;