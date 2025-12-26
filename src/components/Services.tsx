import React from 'react';
import { Service } from '../types';
import '../styles/global.css';

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: '1',
      name: 'Box Braids',
      description: 'Classic and stylish box braids that protect your natural hair while offering versatility. Choose from various lengths, sizes, and colors to match your style.',
      price: 'R180 - R300',
      duration: '3-5 hours',
      image: 'box-braids'
    },
    {
      id: '2',
      name: 'Cornrows',
      description: 'Neat and intricate cornrow designs that showcase craftsmanship and creativity. Perfect for both casual and formal occasions.',
      price: 'R100+',
      duration: '2-3 hours',
      image: 'cornrows'
    },
    {
      id: '3',
      name: 'Lash Extensions (With Your Own)',
      description: 'Professional lash extensions using your own lashes. Enhance your natural beauty with classic, hybrid, or volume styles.',
      price: 'R120',
      duration: '1-2 hours',
      image: 'lashes'
    },
    {
      id: '4',
      name: 'Lash Extensions (Without Your Own)',
      description: 'Complete lash extension service with premium lashes provided. Choose from classic, hybrid, or volume styles for stunning results.',
      price: 'R150',
      duration: '1-2 hours',
      image: 'lashes'
    }
  ];

  const getServiceIcon = (serviceType: string) => {
    const icons: { [key: string]: string } = {
      'box-braids': '💇‍♀️',
      'cornrows': '🎀',
      'lashes': '👁️'
    };
    return icons[serviceType] || '💎';
  };

  const handleBookService = (serviceName: string) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      // Scroll to contact section with offset for fixed navbar
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Optional: Pre-select the service in the form
      setTimeout(() => {
        const serviceSelect = document.getElementById('service') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = serviceName;
        }
      }, 500);
    }
  };

  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid grid-4">
          {services.map((service) => (
            <div key={service.id} className="service-card card">
              <div className="service-icon">
                <span className="icon-emoji">{getServiceIcon(service.image || '')}</span>
              </div>
              <h3 className="service-title">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-details">
                <div className="service-price">
                  <span className="price-label">Starting from:</span>
                  <span className="price-value">{service.price}</span>
                </div>
                <div className="service-duration">
                  <span className="duration-label">Duration:</span>
                  <span className="duration-value">{service.duration}</span>
                </div>
              </div>
              <button
                className="btn btn-outline service-btn"
                onClick={() => handleBookService(service.name)}
              >
                Book This Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;