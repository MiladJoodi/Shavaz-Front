"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import persianNumber from "@/utils/persianNumber";

type SortOption = "latest" | "cheapest" | "expensive";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "latest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
];

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categorySlug));
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    switch (sortBy) {
      case "cheapest":
        result.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        result.sort((a, b) => b.price - a.price);
        break;
      case "latest":
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [selectedCategories, sortBy, priceRange, inStockOnly]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    );
  };

  return (
    <main>
      <Container>
        <Breadcrumb items={[{ label: "محصولات" }]} />

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 border border-gray-100 rounded-lg p-4">
              <h3 className="font-bold text-[#646464] mb-4">فیلترها</h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#646464] mb-3">دسته‌بندی</h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {categories.slice(0, 14).map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer text-sm text-gray-500">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="accent-primary"
                      />
                      {cat.title}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#646464] mb-3">محدوده قیمت (تومان)</h4>
                <div className="flex flex-col gap-2">
                  <input
                    type="number"
                    placeholder="حداقل"
                    value={priceRange.min || ""}
                    onChange={(e) =>
                      setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) || 0 }))
                    }
                    className="border border-gray-200 rounded-md p-2 text-sm outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="حداکثر"
                    value={priceRange.max === 10000000 ? "" : priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: Number(e.target.value) || 10000000,
                      }))
                    }
                    className="border border-gray-200 rounded-md p-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* In Stock */}
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-primary"
                />
                فقط موجود
              </label>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-sm border border-gray-200 rounded-md px-3 py-2"
                >
                  <SlidersHorizontal size={16} />
                  فیلترها
                </button>
                <span className="text-sm text-gray-400">
                  {persianNumber(filteredProducts.length)} محصول
                </span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-primary bg-white"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filters */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((slug) => {
                  const cat = categories.find((c) => c.slug === slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => toggleCategory(slug)}
                      className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
                    >
                      {cat?.title}
                      <X size={12} />
                    </button>
                  );
                })}
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-xs text-gray-400 hover:text-primary"
                >
                  حذف همه
                </button>
              </div>
            )}

            {/* Mobile Filters Sheet */}
            {showFilters && (
              <div className="lg:hidden border border-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#646464]">فیلترها</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {categories.slice(0, 14).map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer text-xs text-gray-500">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="accent-primary"
                      />
                      {cat.title}
                    </label>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-500">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-primary"
                  />
                  فقط موجود
                </label>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <p className="text-gray-400">محصولی با این فیلترها یافت نشد.</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setInStockOnly(false);
                    setPriceRange({ min: 0, max: 10000000 });
                  }}
                  className="text-primary text-sm hover:underline"
                >
                  حذف فیلترها
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
