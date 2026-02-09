export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "men" | "women" | "kids" | "accessories";
  description: string;
  fabric: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: ColorVariant[];
  isNew?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  product: Product;
  color: string;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}
