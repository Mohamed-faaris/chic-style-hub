import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";
import FiltersPanel from "@/components/shop/FiltersPanel";
import { AnimatePresence, motion } from "framer-motion";

const sortOptions = [
  { label: "Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low — High", value: "price-asc" },
  { label: "Price: High — Low", value: "price-desc" },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sort, setSort] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedSizes.length) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }
    if (selectedColors.length) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    }

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [search, selectedCategory, priceRange, selectedSizes, selectedColors, sort]);

  return (
    <main className="container-wide py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-heading mb-2">
          {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : "All Products"}
        </h1>
        <p className="text-sm text-muted-foreground">{filtered.length} products</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="hidden sm:block bg-transparent border-b border-border px-2 py-1 text-sm outline-none focus:border-foreground transition-colors w-48"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-transparent text-xs font-medium tracking-wider uppercase outline-none cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block flex-shrink-0 overflow-hidden"
            >
              <FiltersPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background z-50 p-6 overflow-y-auto lg:hidden"
            >
              <FiltersPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                onClose={() => setFiltersOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Shop;
