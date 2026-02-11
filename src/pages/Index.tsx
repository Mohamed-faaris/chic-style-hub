import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";
import heroImage from "@/assets/hero-image.jpg";
import { useState, useEffect } from "react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const trending = products.filter((p) => p.isTrending).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  const collections = [
    { name: "Women", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop", to: "/shop?category=women" },
    { name: "Men", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop", to: "/shop?category=men" },
    { name: "Kids", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=800&fit=crop", to: "/shop?category=kids" },
    { name: "New Arrivals", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop", to: "/shop?category=&sort=newest" },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen overflow-hidden -mt-16 sm:-mt-20">
        <img
          src={heroImage}
          alt="Fashion campaign"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: `scale(${1.1 + scrollY * 0.0003}) translateY(${scrollY * 0.2}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-foreground/20" />
        <div className="relative container-wide h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-primary-foreground"
            style={{ transform: `translateY(${scrollY * -0.15}px)`, opacity: 1 - scrollY * 0.002 }}
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4 opacity-80">Spring / Summer 2026</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-6">
              The Art of<br />Modern Dressing
            </h1>
            <p className="text-sm sm:text-base opacity-80 mb-8 leading-relaxed max-w-md">
              Discover our curated collection of timeless essentials. Crafted with intention, designed for life.
            </p>
            <div className="flex gap-4">
              <Link to="/shop" className="btn-primary bg-primary-foreground text-foreground hover:opacity-90">
                Shop Now
              </Link>
              <Link to="/shop?category=women" className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                Explore
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container-wide py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-heading text-center mb-12"
        >
          Shop by Category
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={c.to} className="group block relative aspect-[3/4] overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-foreground font-display text-2xl tracking-wide">{c.name}</span>
                    <ArrowRight size={18} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container-wide py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="section-heading">Trending Now</h2>
          <Link to="/shop" className="nav-link">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {trending.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-wide py-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-3">Limited Time Offer</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
              Up to 30% Off
            </h2>
            <p className="text-sm opacity-70 mb-8 max-w-md mx-auto">
              Enjoy exclusive savings on selected pieces from our Spring/Summer collection.
            </p>
            <Link to="/shop" className="inline-block btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              Shop the Sale
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container-wide py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-heading">New Arrivals</h2>
            <Link to="/shop" className="nav-link">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-secondary">
        <div className="container-wide py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-light mb-3">Stay in the Loop</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Be the first to know about new collections, exclusive offers, and styling inspiration.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-background border border-border text-sm outline-none focus:border-foreground transition-colors"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Index;
