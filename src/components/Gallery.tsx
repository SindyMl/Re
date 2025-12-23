import React, { useState } from 'react';
import { GalleryImage } from '../types';
import '../styles/global.css';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Placeholder gallery images with categories
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      url: 'box-braids-1',
      alt: 'Beautiful box braids hairstyle',
      category: 'box-braids'
    },
    {
      id: '2',
      url: 'cornrows-1',
      alt: 'Elegant cornrows design',
      category: 'cornrows'
    },
    {
      id: '3',
      url: 'faux-locs-1',
      alt: 'Stylish faux locs',
      category: 'faux-locs'
    },
    {
      id: '4',
      url: 'lashes-1',
      alt: 'Professional lash extensions',
      category: 'lashes'
    },
    {
      id: '5',
      url: 'box-braids-2',
      alt: 'Long box braids with beads',
      category: 'box-braids'
    },
    {
      id: '6',
      url: 'cornrows-2',
      alt: 'Intricate cornrow patterns',
      category: 'cornrows'
    },
    {
      id: '7',
      url: 'faux-locs-2',
      alt: 'Shoulder-length faux locs',
      category: 'faux-locs'
    },
    {
      id: '8',
      url: 'lashes-2',
      alt: 'Volume lash extensions',
      category: 'lashes'
    },
    {
      id: '9',
      url: 'box-braids-3',
      alt: 'Short box braids style',
      category: 'box-braids'
    }
  ];

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'box-braids': '💇‍♀️',
      'cornrows': '🎀',
      'faux-locs': '✨',
      'lashes': '👁️'
    };
    return icons[category] || '💎';
  };

  return (
    <>
      <section id="gallery" className="section">
        <div className="container">
          <h2 className="section-title">Our Work</h2>
          <p className="gallery-intro">
            Explore our portfolio of beautiful hairstyles and lash extensions. 
            Each look is crafted with precision and care to enhance your natural beauty.
          </p>
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <div className="gallery-image-placeholder">
                  <div className="placeholder-content">
                    <span className="gallery-icon">{getCategoryIcon(image.category)}</span>
                    <p>{image.alt}</p>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <span className="category-icon">{getCategoryIcon(image.category)}</span>
                    <p className="image-title">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            <div className="lightbox-image">
              <div className="lightbox-placeholder">
                <span className="lightbox-icon">
                  {getCategoryIcon(selectedImage.category)}
                </span>
                <p>{selectedImage.alt}</p>
              </div>
            </div>
            <div className="lightbox-info">
              <h3>{selectedImage.alt}</h3>
              <p>Category: {selectedImage.category.replace('-', ' ')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;