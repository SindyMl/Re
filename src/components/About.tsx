import React from 'react';
import '../styles/global.css';

const About: React.FC = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Re</h2>
            <p className="about-description">
              <span className="brand-highlight">Re</span> is a premium salon specializing in natural hair styles and lashes,
              bringing elegance and confidence to every client. Our name represents renewal and rejuvenation -
              we believe that everyone deserves to feel beautiful and confident in their own skin.
            </p>
            <p className="about-description">
              With years of experience in the beauty industry, our skilled stylists are passionate about
              creating looks that not only enhance your natural beauty but also reflect your unique personality.
              We take pride in our attention to detail, quality products, and personalized service.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <span className="feature-icon">💎</span>
                <span className="feature-text">Premium Quality</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎨</span>
                <span className="feature-text">Expert Stylists</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">❤️</span>
                <span className="feature-text">Personalized Service</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <span className="feature-text"> Stunning Results</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="/images/about.jpeg"
              alt="Re Beauty Salon"
              className="about-photo"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            <div className="about-image-placeholder" style={{ display: 'none' }}>
              <div className="placeholder-content">
                <span className="placeholder-icon">💇‍♀️</span>
                <p>Beauty & Excellence</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mission-vision">
          <div className="mission-card card">
            <h3 className="card-title">Our Mission</h3>
            <p className="card-text">
              To provide exceptional beauty services that empower our clients, using the finest products
              and techniques while maintaining the highest standards of hygiene and customer satisfaction.
            </p>
          </div>
          <div className="vision-card card">
            <h3 className="card-title">Our Vision</h3>
            <p className="card-text">
              To be the leading destination for natural hair styling and lash services, known for our
              creativity, professionalism, and commitment to enhancing each client's natural beauty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;