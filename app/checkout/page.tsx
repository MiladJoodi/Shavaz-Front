"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, CreditCard } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/formatPrice";
import persianNumber from "@/utils/persianNumber";
import { ShoppingBag } from "lucide-react";

const checkoutSchema = z.object({
  fullName: z.string().min(3, "نام و نام خانوادگی الزامی است"),
  phone: z
    .string()
    .min(11, "شماره تلفن باید ۱۱ رقم باشد")
    .max(11, "شماره تلفن باید ۱۱ رقم باشد"),
  city: z.string().min(2, "نام شهر الزامی است"),
  address: z.string().min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد"),
  postalCode: z
    .string()
    .min(10, "کد پستی باید ۱۰ رقم باشد")
    .max(10, "کد پستی باید ۱۰ رقم باشد"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, getTotalDiscount, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  if (items.length === 0 && !isSuccess) {
    return (
      <main>
        <Container>
          <Breadcrumb items={[{ label: "سبد خرید", href: "/cart" }, { label: "پرداخت" }]} />
          <EmptyState
            icon={ShoppingBag}
            title="سبد خرید شما خالی است"
            description="ابتدا محصولاتی به سبد خرید اضافه کنید"
            actionLabel="مشاهده محصولات"
            actionHref="/products"
          />
        </Container>
      </main>
    );
  }

  if (isSuccess) {
    return (
      <main>
        <Container>
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <CheckCircle size={64} className="text-green-500" />
            <h1 className="text-2xl font-bold text-[#646464]">سفارش شما با موفقیت ثبت شد!</h1>
            <p className="text-gray-400 text-sm">
              کد پیگیری: <span className="text-[#646464] font-medium">{persianNumber("SHV-" + Math.random().toString().slice(2, 10))}</span>
            </p>
            <p className="text-gray-400 text-sm text-center max-w-md">
              اطلاعات سفارش به شماره تلفن شما ارسال خواهد شد.
            </p>
            <Link
              href="/"
              className="mt-4 bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const total = getTotal();
  const discount = getTotalDiscount();

  const onSubmit = async (_data: CheckoutForm) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <main>
      <Container>
        <Breadcrumb items={[{ label: "سبد خرید", href: "/cart" }, { label: "پرداخت" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Shipping Info */}
              <div className="border border-gray-100 rounded-lg p-6">
                <h2 className="font-bold text-[#646464] mb-4">اطلاعات ارسال</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      نام و نام خانوادگی
                    </label>
                    <input
                      {...register("fullName")}
                      className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                      placeholder="نام کامل خود را وارد کنید"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">شماره تلفن</label>
                    <input
                      {...register("phone")}
                      className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      dir="ltr"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">شهر</label>
                    <input
                      {...register("city")}
                      className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                      placeholder="تهران"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">کد پستی</label>
                    <input
                      {...register("postalCode")}
                      className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary"
                      placeholder="۱۲۳۴۵۶۷۸۹۰"
                      dir="ltr"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-500 mb-1">آدرس کامل</label>
                    <textarea
                      {...register("address")}
                      rows={3}
                      className="w-full border border-gray-200 rounded-md p-2.5 text-sm outline-none focus:border-primary resize-none"
                      placeholder="آدرس دقیق خود را وارد کنید"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="border border-gray-100 rounded-lg p-6">
                <h2 className="font-bold text-[#646464] mb-4">
                  <CreditCard size={20} className="inline ml-2" />
                  روش پرداخت
                </h2>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="accent-primary"
                    />
                    <span className="text-sm text-[#646464]">پرداخت اینترنتی (درگاه بانک)</span>
                  </label>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mt-3">
                  <p className="text-xs text-blue-600">
                    این یک پروژه نمونه است. هیچ پرداخت واقعی انجام نمی‌شود.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال پردازش...
                  </span>
                ) : (
                  <>تایید و پرداخت - {formatPrice(total)} تومان</>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 border border-gray-100 rounded-lg p-6 bg-white">
              <h2 className="font-bold text-[#646464] mb-4">خلاصه سفارش</h2>

              <div className="flex flex-col gap-3 text-sm mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <span className="text-gray-500 line-clamp-1 flex-1 ml-2">
                      {item.product.title} ({persianNumber(item.quantity)}×)
                    </span>
                    <span className="text-[#646464] shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100 mb-3" />

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">جمع سبد خرید</span>
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
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">هزینه ارسال</span>
                  <span className="text-green-600">رایگان</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex items-center justify-between font-bold">
                  <span className="text-[#646464]">مبلغ قابل پرداخت</span>
                  <span className="text-primary text-lg">{formatPrice(total)} تومان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
