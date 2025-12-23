import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/global.css';
import './styles/Navbar.css';
import './styles/Hero.css';
import './styles/Services.css';
import './styles/Gallery.css';
import './styles/About.css';
import './styles/Contact.css';
import './styles/Footer.css';

function App() {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Re Beauty Salon - Expert Hair Braiding & Lashes in Johannesburg';
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Re Beauty Salon offers professional hair braiding services including box braids, cornrows, faux locs, and premium lash installations. Book your appointment today.';
    document.head.appendChild(metaDescription);

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add Montserrat font from Google Fonts
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link3);

    // Cleanup
    return () => {
      if (document.head.contains(metaDescription)) {
        document.head.removeChild(metaDescription);
      }
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;