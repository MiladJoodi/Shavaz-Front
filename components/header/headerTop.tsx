"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, LogIn, Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import persianNumber from "@/utils/persianNumber";

const HeaderTop = () => {
  const itemCount = useCartStore((state) => state.getItemCount());
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="flex items-center px-4 py-2 md:py-5 justify-between gap-8">
      <div className="flex items-center gap-8 lg:gap-16 flex-1">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" width={120} height={60} alt="شاواز" />
        </Link>

        {/* Search */}
        <div className="header_search flex items-center relative w-full">
          <Search size={20} className="absolute right-2 text-gray-400" />
          <input
            type="text"
            className="bg-gray-100 pr-8 rounded-md p-2.5 text-sm outline-none text-black w-full md:w-[75%]"
            placeholder="جستجو در شاواز"
          />
        </div>
      </div>

      {/* Login */}
      <div className="hidden md:flex items-center justify-center gap-4 flex-0">
        {isAuthenticated ? (
          <Link
            href="/profile"
            className="flex py-1 px-3 gap-1 items-center text-primary justify-center text-[14px] border border-primary rounded-md cursor-pointer hover:bg-primary/5 transition-colors"
          >
            <Heart size={20} />
            <span>پروفایل</span>
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="flex py-1 px-3 gap-1 items-center text-gray-400 justify-center text-[14px] border rounded-md cursor-pointer hover:text-primary hover:border-primary transition-colors"
          >
            <LogIn size={20} />
            <span>ورود | ثبت نام</span>
          </Link>
        )}

        <div className="text-gray-400 flex gap-3">
          <div className="border-r" />
          <Link href="/profile" className="hover:text-primary transition-colors">
            <Heart size={20} className="cursor-pointer" />
          </Link>
          <div className="border-r" />
          <Link href="/cart" className="relative hover:text-primary transition-colors">
            <ShoppingCart size={20} className="cursor-pointer" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {persianNumber(itemCount)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
