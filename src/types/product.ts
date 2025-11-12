export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  category: string;
  inStock: boolean;
  color?: string;
  description?: string;
  specifications?: Array<{ name: string; value: string }>;
  features?: string[];
  reviews?: Array<{
    id: string;
    user: string;
    rating: number;
    date: string;
    comment: string;
  }>;
}

export interface UseProductsProps {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export interface ProductGalleryProps {
  images: string[];
}

export interface ProductInfoProps {
  product: Product;
}

export interface ProductTabsProps {
  product: Product;
}

export interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Specification {
  name: string;
  value: string;
}
