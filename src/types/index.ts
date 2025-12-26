// Re Beauty Salon - Type Definitions

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  image?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  price: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

export interface NavbarLink {
  id: string;
  label: string;
  href: string;
}

export interface SalonInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
}

export type MobileMenuOpen = boolean;