import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-20">
    <div className="container-wide py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-wider mb-4">MAISON</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Contemporary fashion for the modern individual. Quality, sustainability, and timeless design.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">Shop</h4>
          <div className="flex flex-col gap-2">
            {["Women", "Men", "Kids", "Accessories", "New Arrivals"].map((l) => (
              <Link key={l} to="/shop" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">Company</h4>
          <div className="flex flex-col gap-2">
            {["About Us", "Careers", "Sustainability", "Press"].map((l) => (
              <span key={l} className="text-sm opacity-70 cursor-pointer hover:opacity-100 transition-opacity">
                {l}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">Help</h4>
          <div className="flex flex-col gap-2">
            {["Contact Us", "Shipping & Returns", "Size Guide", "FAQ", "Privacy Policy"].map((l) => (
              <span key={l} className="text-sm opacity-70 cursor-pointer hover:opacity-100 transition-opacity">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs opacity-50">© 2026 MAISON. All rights reserved.</p>
        <div className="flex gap-4">
          <Instagram size={18} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <Facebook size={18} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <Twitter size={18} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
