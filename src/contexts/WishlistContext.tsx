import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    if (items.find((i) => i.id === product.id)) return;
    setItems((prev) => [...prev, product]);
    toast({ title: "Added to wishlist", description: product.name });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
    toast({ title: "Removed from wishlist" });
  };

  const isInWishlist = (productId: string) => items.some((i) => i.id === productId);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, totalItems: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
