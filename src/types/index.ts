export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string; // category slug
  images: string[];
  inStock: boolean;
  featured: boolean;
  tags?: string[];
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  logo: string; // path relative to /public
  whatsapp: string; // international format without +, e.g. 212600000000
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
  };
}
