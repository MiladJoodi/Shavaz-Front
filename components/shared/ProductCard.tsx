"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/formatPrice";
import persianNumber from "@/utils/persianNumber";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { useCartStore } from "@/stores/cart-store";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative overflow-hidden flex flex-col items-center gap-3 bg-white rounded-lg px-3 py-4 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer">
      {product.percent > 0 && (
        <span className="absolute top-2 left-2 text-xs bg-primary text-white rounded-md flex items-center px-1.5 py-0.5 z-10">
          {persianNumber(product.percent)}%
        </span>
      )}

      {!product.inStock && (
        <span className="absolute top-2 right-2 text-xs bg-gray-500 text-white rounded-md px-1.5 py-0.5 z-10">
          ناموجود
        </span>
      )}

      <Link href={`/products/${product.slug}`} className="w-full flex justify-center">
        <Image
          src={product.images[0]}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          alt={product.title}
          width={200}
          height={200}
          className="w-[130px] h-[130px] object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <Link href={`/products/${product.slug}`} className="w-full">
        <p className="text-sm text-right text-[#646464] leading-6 line-clamp-2 min-h-[48px]">
          {product.title}
        </p>
      </Link>

      <div className="flex flex-col w-full gap-1 mt-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-primary">
            <span className="text-sm">تومان</span>
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          </div>
        </div>

        {product.oldPrice > product.price && (
          <span className="flex items-center gap-1 text-gray-400 self-start text-xs font-light line-through">
            <span>تومان</span>
            <span>{formatPrice(product.oldPrice)}</span>
          </span>
        )}
      </div>

      {product.inStock && (
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/90"
        >
          <ShoppingCart size={16} />
          افزودن به سبد
        </button>
      )}
    </div>
  );
};

export default ProductCard;
