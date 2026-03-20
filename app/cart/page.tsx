"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import persianNumber from "@/utils/persianNumber";
import { shimmer, toBase64 } from "@/utils/shimmer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getTotalDiscount, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <main>
        <Container>
          <Breadcrumb items={[{ label: "سبد خرید" }]} />
          <EmptyState
            icon={ShoppingBag}
            title="سبد خرید شما خالی است"
            description="محصولات مورد علاقه خود را به سبد خرید اضافه کنید"
            actionLabel="مشاهده محصولات"
            actionHref="/products"
          />
        </Container>
      </main>
    );
  }

  const total = getTotal();
  const discount = getTotalDiscount();

  return (
    <main>
      <Container>
        <Breadcrumb items={[{ label: "سبد خرید" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-[#646464]">
                سبد خرید ({persianNumber(items.length)} کالا)
              </h1>
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                حذف همه
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 border border-gray-100 rounded-lg p-4 bg-white"
                >
                  <Link href={`/products/${item.product.slug}`} className="shrink-0">
                    <Image
                      src={item.product.images[0]}
                      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                      alt={item.product.title}
                      width={100}
                      height={100}
                      className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col gap-2">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="text-sm text-[#646464] line-clamp-2 hover:text-primary transition-colors">
                        {item.product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">
                        {formatPrice(item.product.price)}
                      </span>
                      <span className="text-xs text-primary">تومان</span>
                    </div>

                    {item.product.oldPrice > item.product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(item.product.oldPrice)} تومان
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm text-[#646464]">
                          {persianNumber(item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="sticky top-24 border border-gray-100 rounded-lg p-6 bg-white">
              <h2 className="font-bold text-[#646464] mb-4">خلاصه سبد خرید</h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">قیمت کالاها</span>
                  <span className="text-[#646464]">
                    {formatPrice(total + discount)} تومان
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between text-primary">
                    <span>تخفیف</span>
                    <span>{formatPrice(discount)} تومان</span>
                  </div>
                )}

                <hr className="border-gray-100" />

                <div className="flex items-center justify-between font-bold">
                  <span className="text-[#646464]">مبلغ قابل پرداخت</span>
                  <span className="text-primary text-lg">
                    {formatPrice(total)} تومان
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-md mt-6 hover:bg-primary/90 transition-colors"
              >
                ادامه فرآیند خرید
              </Link>

              <Link
                href="/products"
                className="w-full flex items-center justify-center text-sm text-gray-400 mt-3 hover:text-primary transition-colors"
              >
                ادامه خرید
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
