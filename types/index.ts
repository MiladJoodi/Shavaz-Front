export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  percent: number;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

export interface Category {
  id: number;
  slug: string;
  title: string;
  image: string;
  productCount: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  trackingCode: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  productId: number;
}
