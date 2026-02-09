import { X } from "lucide-react";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  selectedSizes: string[];
  setSelectedSizes: (v: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (v: string[]) => void;
  onClose?: () => void;
}

const categories = ["All", "Men", "Women", "Kids", "Accessories"];
const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Red", hex: "#C41E3A" },
  { name: "Blue", hex: "#4A7CAC" },
  { name: "Beige", hex: "#D4C5B2" },
  { name: "Grey", hex: "#808080" },
  { name: "Olive", hex: "#708238" },
];

const FiltersPanel = ({
  selectedCategory, setSelectedCategory,
  priceRange, setPriceRange,
  selectedSizes, setSelectedSizes,
  selectedColors, setSelectedColors,
  onClose,
}: Props) => {
  const toggleSize = (s: string) => {
    setSelectedSizes(
      selectedSizes.includes(s) ? selectedSizes.filter((x) => x !== s) : [...selectedSizes, s]
    );
  };

  const toggleColor = (c: string) => {
    setSelectedColors(
      selectedColors.includes(c) ? selectedColors.filter((x) => x !== c) : [...selectedColors, c]
    );
  };

  return (
    <div className="space-y-8">
      {onClose && (
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium tracking-[0.2em] uppercase">Filters</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
      )}

      {/* Category */}
      <div>
        <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c === "All" ? "" : c.toLowerCase())}
              className={`filter-chip ${(c === "All" && !selectedCategory) || selectedCategory === c.toLowerCase() ? "active" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-3">
          Price: ${priceRange[0]} — ${priceRange[1]}
        </h4>
        <input
          type="range"
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-foreground"
        />
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`size-btn ${selectedSizes.includes(s) ? "active" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-3">Color</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleColor(c.name)}
              className={`color-dot ${selectedColors.includes(c.name) ? "active" : ""}`}
              style={{
                backgroundColor: c.hex,
                border: c.hex === "#FFFFFF" ? "1px solid hsl(var(--border))" : undefined,
                width: "28px",
                height: "28px",
              }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
