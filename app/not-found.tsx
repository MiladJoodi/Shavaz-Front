import Link from "next/link";
import { Home, Search } from "lucide-react";
import Container from "@/components/container/container";

export default function NotFound() {
  return (
    <main>
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="text-center">
            <h1 className="text-8xl font-bold text-primary/20 mb-2">۴۰۴</h1>
            <h2 className="text-2xl font-bold text-[#646464] mb-2">
              صفحه مورد نظر یافت نشد
            </h2>
            <p className="text-sm text-gray-400 max-w-md">
              صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است. لطفاً آدرس
              را بررسی کنید یا به صفحه اصلی بازگردید.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-md text-sm hover:bg-primary/90 transition-colors"
            >
              <Home size={18} />
              صفحه اصلی
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 border border-gray-200 text-[#646464] px-6 py-2.5 rounded-md text-sm hover:border-primary hover:text-primary transition-colors"
            >
              <Search size={18} />
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
