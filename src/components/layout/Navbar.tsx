import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-wide flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu */}
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link to="/" className="font-display text-2xl sm:text-3xl font-semibold tracking-wider">
            MAISON
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/shop?category=women" className="nav-link">Women</Link>
            <Link to="/shop?category=men" className="nav-link">Men</Link>
            <Link to="/shop?category=kids" className="nav-link">Kids</Link>
            <Link to="/shop?category=accessories" className="nav-link">Accessories</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(!searchOpen)} className="hover:opacity-60 transition-opacity">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="relative hover:opacity-60 transition-opacity">
              <Heart size={20} />
              {wishlistTotal > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                  {wishlistTotal}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative hover:opacity-60 transition-opacity">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="hidden sm:block hover:opacity-60 transition-opacity">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden"
            >
              <form onSubmit={handleSearch} className="container-wide py-4">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground font-light tracking-wide"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-background z-50 p-6"
            >
              <button className="mb-8" onClick={() => setMobileOpen(false)}>
                <X size={22} />
              </button>
              <nav className="flex flex-col gap-6">
                {[
                  { label: "Shop All", to: "/shop" },
                  { label: "Women", to: "/shop?category=women" },
                  { label: "Men", to: "/shop?category=men" },
                  { label: "Kids", to: "/shop?category=kids" },
                  { label: "Accessories", to: "/shop?category=accessories" },
                  { label: "Wishlist", to: "/wishlist" },
                  { label: "Cart", to: "/cart" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-display tracking-wide hover:opacity-60 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar;
