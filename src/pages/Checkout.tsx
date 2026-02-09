import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Banknote, Smartphone } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const delivery = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + delivery;

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "",
  });
  const [payment, setPayment] = useState("card");

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Order Placed!", description: "Thank you for your purchase. Your order is being processed." });
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <main className="container-wide py-20 text-center">
        <h1 className="section-heading mb-4">Nothing to Checkout</h1>
        <Link to="/shop" className="btn-primary inline-block">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="container-wide py-8">
      <h1 className="section-heading mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Address */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">Shipping Address</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", field: "firstName" },
                { label: "Last Name", field: "lastName" },
                { label: "Email", field: "email", type: "email", full: false },
                { label: "Phone", field: "phone", type: "tel" },
                { label: "Address", field: "address", full: true },
                { label: "City", field: "city" },
                { label: "State", field: "state" },
                { label: "ZIP Code", field: "zip" },
                { label: "Country", field: "country" },
              ].map((f) => (
                <div key={f.field} className={f.full ? "sm:col-span-2" : ""}>
                  <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                  <input
                    type={f.type || "text"}
                    value={form[f.field as keyof typeof form]}
                    onChange={(e) => update(f.field, e.target.value)}
                    required
                    className="w-full border border-border px-3 py-2.5 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">Payment Method</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: "card", label: "Credit Card", icon: CreditCard },
                { id: "upi", label: "UPI", icon: Smartphone },
                { id: "cod", label: "Cash on Delivery", icon: Banknote },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayment(m.id)}
                  className={`flex items-center gap-3 p-4 border transition-colors ${
                    payment === m.id ? "border-foreground bg-secondary" : "border-border hover:border-foreground"
                  }`}
                >
                  <m.icon size={18} />
                  <span className="text-sm font-medium">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-secondary p-6 space-y-4">
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase mb-4">Order Summary</h3>
            {items.map((item) => (
              <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-3 text-sm">
                <div className="w-12 h-16 bg-muted overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.colors.find((c) => c.name === item.color)?.image || item.product.colors[0].image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">{item.color} / {item.size} × {item.quantity}</p>
                </div>
                <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full mt-4">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Checkout;
