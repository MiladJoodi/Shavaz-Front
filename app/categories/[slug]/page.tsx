"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductCard from "@/components/shared/ProductCard";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import persianNumber from "@/utils/persianNumber";

type SortOption = "latest" | "cheapest" | "expensive";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const categoryProducts = useMemo(() => {
    const prods = getProductsByCategory(slug);
    switch (sortBy) {
      case "cheapest":
        return [...prods].sort((a, b) => a.price - b.price);
      case "expensive":
        return [...prods].sort((a, b) => b.price - a.price);
      default:
        return prods;
    }
  }, [slug, sortBy]);

  if (!category) {
    return (
      <main>
        <Container className="py-16 text-center">
          <p className="text-gray-400 text-lg">دسته‌بندی مورد نظر یافت نشد.</p>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <Breadcrumb
          items={[
            { label: "محصولات", href: "/products" },
            { label: category.title },
          ]}
        />

        {/* Category Header */}
        <div className="bg-gradient-to-l from-primary/5 to-secondary/5 rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#646464]">{category.title}</h1>
          <p className="text-sm text-gray-400 mt-2">
            {persianNumber(categoryProducts.length)} محصول در این دسته‌بندی
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-400">
            {persianNumber(categoryProducts.length)} محصول
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-primary bg-white"
          >
            <option value="latest">جدیدترین</option>
            <option value="cheapest">ارزان‌ترین</option>
            <option value="expensive">گران‌ترین</option>
          </select>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-400">محصولی در این دسته‌بندی یافت نشد.</p>
          </div>
        )}
      </Container>
    </main>
  );
}
