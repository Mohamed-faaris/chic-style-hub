import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const [hoveredColor, setHoveredColor] = useState(0);
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-3">
          <img
            src={product.colors[hoveredColor]?.image}
            alt={product.name}
            className="w-full h-full object-cover product-image transition-transform duration-700 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 right-12 bg-destructive text-destructive-foreground text-[10px] font-bold tracking-wider px-3 py-1">
              SALE
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              inWishlist ? removeItem(product.id) : addItem(product);
            }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full transition-all hover:bg-background"
          >
            <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      <div className="space-y-1.5">
        <div className="flex gap-1.5">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              onMouseEnter={() => setHoveredColor(i)}
              className={`color-dot ${hoveredColor === i ? "active" : ""}`}
              style={{ backgroundColor: c.hex, border: c.hex === "#FFFFFF" || c.hex === "#FFFDD0" || c.hex === "#FFFFF0" ? "1px solid hsl(var(--border))" : undefined }}
            />
          ))}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-accent text-accent" />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount})</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
