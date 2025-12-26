import React, { useState } from 'react';
import { ContactForm } from '../types';
import '../styles/global.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const services = [
    'Box Braids',
    'Cornrows',
    'Lash Extensions (With Your Own)',
    'Lash Extensions (Without Your Own)',
    'Consultation'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Use production API URL if running locally, otherwise use relative path
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/book-appointment'
        : process.env.REACT_APP_API_URL || 'https://re-ruddy-rho.vercel.app/api/book-appointment';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message || 'Thank you for your booking request! We will contact you within 24 hours to confirm your appointment.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: ''
        });
      } else {
        setSubmitMessage(`Error: ${data.error || 'Failed to submit booking. Please try again or call us directly.'}`);
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitMessage('Network error. Please check your connection and try again, or call us directly at 076 514 0211.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const salonInfo = {
    address: 'House No. 389 Alpheus Manthape Street, Nancefield, Musina, 0900',
    phone: '076 514 0211',
    email: 'mudetorenee@gmail.com',
    hours: {
      'Monday': '9:00 AM - 7:00 PM',
      'Tuesday': '9:00 AM - 7:00 PM',
      'Wednesday': '9:00 AM - 7:00 PM',
      'Thursday': '9:00 AM - 7:00 PM',
      'Friday': '9:00 AM - 7:00 PM',
      'Saturday': '8:00 AM - 6:00 PM',
      'Sunday': '10:00 AM - 4:00 PM'
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Book Your Appointment</h2>

        <div className="contact-content">
          {/* Booking Form */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Schedule Your Visit</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service" className="form-label">Service *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date" className="form-label">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time" className="form-label">Preferred Time *</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select a time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Additional Notes</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Any special requests or questions..."
                />
              </div>

              <button
                type="submit"
                className="btn contact-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </button>

              {submitMessage && (
                <div className="submit-message">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Salon Information */}
          <div className="contact-info">
            <div className="info-card card">
              <h3 className="info-title">Salon Information</h3>

              <div className="info-item">
                <span className="info-icon">📍</span>
                <div className="info-content">
                  <h4>Address</h4>
                  <p>{salonInfo.address}</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📞</span>
                <div className="info-content">
                  <h4>Phone</h4>
                  <p>{salonInfo.phone}</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📧</span>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>{salonInfo.email}</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🕐</span>
                <div className="info-content">
                  <h4>Business Hours</h4>
                  <div className="hours-list">
                    {Object.entries(salonInfo.hours).map(([day, hours]) => (
                      <div key={day} className="hours-item">
                        <span className="day">{day}:</span>
                        <span className="time">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="map-container">
              <iframe
                src="https://maps.google.com/maps?q=-22.33339,30.03396&t=&z=18&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Re Beauty Salon Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;