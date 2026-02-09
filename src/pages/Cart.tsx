import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const delivery = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <main className="container-wide py-20 text-center">
        <ShoppingBag size={48} className="mx-auto mb-6 text-muted-foreground" />
        <h1 className="section-heading mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary inline-block">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="container-wide py-8">
      <h1 className="section-heading mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={`${item.product.id}-${item.color}-${item.size}`}
                layout
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 sm:gap-6 border-b border-border pb-6"
              >
                <Link to={`/product/${item.product.id}`} className="w-24 sm:w-32 aspect-[3/4] bg-secondary overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.colors.find((c) => c.name === item.color)?.image || item.product.colors[0].image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-medium">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.color, item.size)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-xs font-medium border-x border-border">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-secondary p-6 space-y-4">
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Discount code"
                className="flex-1 bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors"
              />
              <button className="btn-outline py-2 px-4 text-xs">Apply</button>
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="block text-center btn-primary w-full mt-4">
              Checkout
            </Link>
            <Link to="/shop" className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors mt-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
