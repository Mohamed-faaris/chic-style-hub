import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Minus, Plus, Heart, Truck, RotateCcw, Shield } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/shop/ProductCard";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="section-heading mb-4">Product Not Found</h1>
        <Link to="/shop" className="btn-primary inline-block">Back to Shop</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, product.colors[selectedColor].name, selectedSize, quantity);
  };

  return (
    <main className="container-wide py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground mb-8 flex gap-2">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="aspect-[3/4] bg-secondary overflow-hidden">
            <img
              src={product.colors[selectedColor].image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(i)}
                className={`aspect-square bg-secondary overflow-hidden border-2 transition-colors ${
                  selectedColor === i ? "border-foreground" : "border-transparent"
                }`}
              >
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-light mb-3">{product.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Color Selector */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase mb-3">
              Color: {product.colors[selectedColor].name}
            </h4>
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(i)}
                  className={`color-dot ${selectedColor === i ? "active" : ""}`}
                  style={{
                    backgroundColor: c.hex,
                    width: "32px",
                    height: "32px",
                    border: c.hex === "#FFFFFF" || c.hex === "#FFFDD0" || c.hex === "#FFFFF0"
                      ? "1px solid hsl(var(--border))" : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase mb-3">Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`size-btn ${selectedSize === s ? "active" : ""}`}
                  style={{ width: "auto", padding: "0 16px" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase mb-3">Quantity</h4>
            <div className="flex items-center border border-border w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-12 h-10 flex items-center justify-center text-sm font-medium border-x border-border">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {selectedSize ? "Add to Cart" : "Select a Size"}
            </button>
            <button
              onClick={() => inWishlist ? removeWishlist(product.id) : addWishlist(product)}
              className="w-12 h-12 flex items-center justify-center border border-border hover:border-foreground transition-colors"
            >
              <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          {selectedSize && (
            <Link
              to="/checkout"
              onClick={() => addItem(product, product.colors[selectedColor].name, selectedSize, quantity)}
              className="block text-center btn-accent w-full"
            >
              Buy Now
            </Link>
          )}

          {/* Info Sections */}
          <div className="border-t border-border pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Truck size={18} className="mt-0.5 flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders over $100. Standard delivery 3-5 business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw size={18} className="mt-0.5 flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day return policy. Free returns on all orders.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield size={18} className="mt-0.5 flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">SSL encrypted checkout. All major cards accepted.</p>
              </div>
            </div>
          </div>

          {/* Fabric Info */}
          <div className="border-t border-border pt-6">
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase mb-2">Fabric & Care</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.fabric}</p>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <section className="mt-20 border-t border-border pt-12">
        <h2 className="section-heading mb-8">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Sarah M.", rating: 5, text: "Absolutely stunning quality. The fit is perfect and the fabric feels luxurious. Will definitely buy more.", date: "2 weeks ago" },
            { name: "James K.", rating: 4, text: "Great piece, true to size. The color is exactly as shown. Only giving 4 stars because shipping took a bit longer than expected.", date: "1 month ago" },
            { name: "Elena R.", rating: 5, text: "This has become my go-to piece. So versatile and well-made. The attention to detail is impressive.", date: "3 weeks ago" },
          ].map((review, i) => (
            <div key={i} className="p-6 border border-border">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className={j < review.rating ? "fill-accent text-accent" : "text-border"} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-3">{review.text}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{review.name}</span>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="section-heading mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
