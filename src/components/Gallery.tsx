import React, { useState } from 'react';
import { GalleryImage } from '../types';
import '../styles/global.css';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Gallery images with actual files and pricing in Rands
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      url: '1.jpeg',
      alt: 'Cornrows',
      category: 'cornrows',
      price: 'R100'
    },
    {
      id: '2',
      url: '2.jpeg',
      alt: 'Box Braids',
      category: 'box-braids',
      price: 'R250'
    },
    {
      id: '3',
      url: '3.jpeg',
      alt: 'Cornrows',
      category: 'cornrows',
      price: 'R100'
    },
    {
      id: '4',
      url: '4.jpeg',
      alt: 'Box Braids',
      category: 'box-braids',
      price: 'R180'
    },
    {
      id: '5',
      url: '5.jpeg',
      alt: 'Box Braids',
      category: 'box-braids',
      price: 'R180'
    },
    {
      id: '6',
      url: '6.jpeg',
      alt: 'Box Braids',
      category: 'box-braids',
      price: 'R280'
    },
    {
      id: '7',
      url: '7.jpeg',
      alt: 'Box Braids',
      category: 'box-braids',
      price: 'R280'
    },
    {
      id: '8',
      url: '8.jpeg',
      alt: 'Box Braids',
      category: 'box-braids',
      price: 'R300'
    },
    {
      id: '9',
      url: '9.jpeg',
      alt: 'Lash Extensions',
      category: 'lashes',
      price: 'R120'
    },
    {
      id: '12',
      url: '12.jpeg',
      alt: 'Lash Extensions',
      category: 'lashes',
      price: 'R120'
    },
    {
      id: '13',
      url: '13.jpeg',
      alt: 'Lash Extensions',
      category: 'lashes',
      price: 'R150'
    },
    {
      id: '14',
      url: '14.jpeg',
      alt: 'Lash Extensions',
      category: 'lashes',
      price: 'R150'
    },
    {
      id: '15',
      url: '15.jpeg',
      alt: 'Lash Extensions',
      category: 'lashes',
      price: 'R120'
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
                className="gallery-card"
                onClick={() => openLightbox(image)}
              >
                <div className="gallery-image-container">
                  <img
                    src={`/images/${image.url}`}
                    alt={image.alt}
                    className="gallery-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'flex';
                    }}
                  />
                  <div className="gallery-image-placeholder" style={{ display: 'none' }}>
                    <div className="placeholder-content">
                      <span className="gallery-icon">{getCategoryIcon(image.category)}</span>
                      <p>{image.alt}</p>
                    </div>
                  </div>
                </div>
                <div className="gallery-price-tag">
                  <p className="image-price">{image.price}</p>
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
              <img
                src={`/images/${selectedImage.url}`}
                alt={selectedImage.alt}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'block';
                }}
              />
              <div className="lightbox-placeholder" style={{ display: 'none' }}>
                <span className="lightbox-icon">
                  {getCategoryIcon(selectedImage.category)}
                </span>
                <p>{selectedImage.alt}</p>
              </div>
            </div>
            <div className="lightbox-info">
              <h3>{selectedImage.alt}</h3>
              <p className="lightbox-category">Category: {selectedImage.category.replace('-', ' ')}</p>
              <p className="lightbox-price">Price: {selectedImage.price}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;