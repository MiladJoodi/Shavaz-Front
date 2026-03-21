"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductCard from "@/components/shared/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getReviewsByProductId } from "@/data/reviews";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import persianNumber from "@/utils/persianNumber";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { cn } from "@/lib/cn";

type Tab = "description" | "reviews";

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <Container className="py-16 text-center">
        <p className="text-gray-400 text-lg">محصول مورد نظر یافت نشد.</p>
      </Container>
    );
  }

  const reviews = getReviewsByProductId(product.id);
  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  return (
    <Container>
      <Breadcrumb
        items={[
          { label: "محصولات", href: "/products" },
          { label: product.category, href: `/categories/${product.categorySlug}` },
          { label: product.title },
        ]}
      />

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-center bg-white">
            <Image
              src={product.images[selectedImage]}
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              alt={product.title}
              width={400}
              height={400}
              className="w-full max-w-[350px] h-auto object-contain"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "border rounded-md p-2 w-20 h-20 flex items-center justify-center transition-colors",
                  selectedImage === index
                    ? "border-primary"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <Image
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold text-[#646464] leading-8">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={cn(
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              ({persianNumber(product.reviewCount)} نظر)
            </span>
          </div>

          {/* Brand & Category */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              برند: <span className="text-[#646464] font-medium">{product.brand}</span>
            </span>
            <span>
              دسته‌بندی: <span className="text-[#646464] font-medium">{product.category}</span>
            </span>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-primary">تومان</span>
              {product.percent > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-md">
                  {persianNumber(product.percent)}% تخفیف
                </span>
              )}
            </div>
            {product.oldPrice > product.price && (
              <span className="text-gray-400 text-sm line-through mt-1 block">
                {formatPrice(product.oldPrice)} تومان
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full",
                product.inStock ? "bg-green-500" : "bg-red-500"
              )}
            />
            <span className={cn("text-sm", product.inStock ? "text-green-600" : "text-red-500")}>
              {product.inStock ? "موجود در انبار" : "ناموجود"}
            </span>
          </div>

          {/* Quantity & Add to Cart */}
          {product.inStock && (
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 text-[#646464] min-w-[40px] text-center">
                  {persianNumber(quantity)}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart size={20} />
                افزودن به سبد خرید
              </button>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-3">
              <Truck size={20} className="text-primary" />
              <span className="text-xs text-gray-500 text-center">ارسال سریع</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-3">
              <Shield size={20} className="text-primary" />
              <span className="text-xs text-gray-500 text-center">ضمانت اصالت</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-lg p-3">
              <RotateCcw size={20} className="text-primary" />
              <span className="text-xs text-gray-500 text-center">۷ روز بازگشت</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "description"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            )}
          >
            توضیحات محصول
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "reviews"
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            )}
          >
            نظرات ({persianNumber(reviews.length)})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "description" && (
        <div className="prose max-w-none mb-12">
          <p className="text-[#646464] leading-8 text-sm">{product.description}</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400">برند</span>
              <p className="text-sm text-[#646464] font-medium mt-1">{product.brand}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400">دسته‌بندی</span>
              <p className="text-sm text-[#646464] font-medium mt-1">{product.category}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400">امتیاز</span>
              <p className="text-sm text-[#646464] font-medium mt-1">
                {persianNumber(product.rating)} از ۵
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-400">وضعیت</span>
              <p className="text-sm text-[#646464] font-medium mt-1">
                {product.inStock ? "موجود" : "ناموجود"}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="mb-12">
          {reviews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#646464]">{review.author}</span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={cn(
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 leading-6">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">هنوز نظری ثبت نشده است.</p>
          )}
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#646464] mb-6">محصولات مرتبط</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
