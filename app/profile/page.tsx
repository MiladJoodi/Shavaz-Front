"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Package, User, MapPin, Phone, Mail, Edit } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { useAuthStore } from "@/stores/auth-store";
import { orders } from "@/data/orders";
import { formatPrice } from "@/lib/formatPrice";
import persianNumber from "@/utils/persianNumber";
import { cn } from "@/lib/cn";

const statusMap: Record<string, { label: string; color: string }> = {
  processing: { label: "در حال پردازش", color: "text-yellow-600 bg-yellow-50" },
  shipped: { label: "ارسال شده", color: "text-blue-600 bg-blue-50" },
  delivered: { label: "تحویل شده", color: "text-green-600 bg-green-50" },
  cancelled: { label: "لغو شده", color: "text-red-600 bg-red-50" },
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <main>
        <Container>
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <User size={48} className="text-gray-300" />
            <p className="text-gray-400">برای مشاهده پروفایل ابتدا وارد شوید</p>
            <Link
              href="/auth/login"
              className="bg-primary text-white px-6 py-2.5 rounded-md text-sm hover:bg-primary/90 transition-colors"
            >
              ورود به حساب
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <main>
      <Container>
        <Breadcrumb items={[{ label: "پروفایل" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* User Info */}
          <div className="lg:col-span-1">
            <div className="border border-gray-100 rounded-lg p-6 bg-white">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg font-bold text-[#646464]">{user.name}</h2>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={16} />
                  <span dir="ltr">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={16} />
                  <span dir="ltr">{user.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>{user.address}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-[#646464] py-2.5 rounded-md text-sm hover:border-primary hover:text-primary transition-colors">
                  <Edit size={16} />
                  ویرایش اطلاعات
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 py-2.5 rounded-md text-sm hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  خروج از حساب
                </button>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#646464] mb-4 flex items-center gap-2">
              <Package size={22} />
              تاریخچه سفارشات
            </h2>

            {orders.length > 0 ? (
              <div className="flex flex-col gap-4">
                {orders.map((order) => {
                  const status = statusMap[order.status];
                  return (
                    <div
                      key={order.id}
                      className="border border-gray-100 rounded-lg p-4 bg-white"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[#646464] font-medium">
                            سفارش #{persianNumber(order.id)}
                          </span>
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-md",
                              status.color
                            )}
                          >
                            {status.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{order.date}</span>
                      </div>

                      <div className="flex flex-col gap-2 mb-3">
                        {order.items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-gray-500 line-clamp-1 flex-1">
                              {item.product.title} ({persianNumber(item.quantity)}×)
                            </span>
                            <span className="text-[#646464] shrink-0 mr-4">
                              {formatPrice(item.product.price * item.quantity)} تومان
                            </span>
                          </div>
                        ))}
                      </div>

                      <hr className="border-gray-100 mb-3" />

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          کد پیگیری: {order.trackingCode}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {formatPrice(order.total)} تومان
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center py-12">
                <Package size={40} className="text-gray-300 mb-3" />
                <p className="text-gray-400 text-sm">هنوز سفارشی ثبت نکرده‌اید.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
