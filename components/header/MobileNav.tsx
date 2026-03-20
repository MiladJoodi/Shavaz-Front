"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import persianNumber from "@/utils/persianNumber";
import { cn } from "@/lib/cn";

const navItems = [
  { icon: Home, label: "خانه", href: "/" },
  { icon: Grid3X3, label: "دسته‌بندی", href: "/products" },
  { icon: ShoppingCart, label: "سبد خرید", href: "/cart" },
  { icon: User, label: "پروفایل", href: "/profile" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 relative",
                isActive ? "text-primary" : "text-gray-400"
              )}
            >
              <div className="relative">
                <item.icon size={22} />
                {item.href === "/cart" && itemCount > 0 && (
                  <span className="absolute -top-2 -left-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {persianNumber(itemCount)}
                  </span>
                )}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
