import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/shop/ProductCard";

const Wishlist = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <main className="container-wide py-20 text-center">
        <Heart size={48} className="mx-auto mb-6 text-muted-foreground" />
        <h1 className="section-heading mb-4">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-8">Save your favorite pieces to revisit later.</p>
        <Link to="/shop" className="btn-primary inline-block">Explore Collection</Link>
      </main>
    );
  }

  return (
    <main className="container-wide py-8">
      <h1 className="section-heading mb-2">Wishlist</h1>
      <p className="text-sm text-muted-foreground mb-8">{items.length} saved items</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
