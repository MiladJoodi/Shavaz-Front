import { BadgePercent, BookOpen, Flame, Menu, Phone, Store, Zap } from "lucide-react";
import Link from "next/link";

const navbarLinks = [
  {
    icon: <Menu size={19} />,
    title: "دسته‌بندی‌ها",
    url: "/products",
  },
  {
    icon: <Zap size={19} />,
    title: "پرفروش‌ترین‌های هفته",
    url: "/products",
  },
  {
    icon: <BadgePercent size={19} />,
    title: "محصولات تخفیف‌دار",
    url: "/products",
  },
  {
    icon: <BookOpen size={19} />,
    title: "بلاگ",
    url: "/blog",
  },
  {
    icon: <Phone size={19} />,
    title: "تماس با ما",
    url: "/contact",
  },
  {
    icon: <Store size={19} />,
    title: "درباره ما",
    url: "/about",
  },
];

const HeaderBotton = () => {
  return (
    <div className="hidden lg:flex justify-between items-center ">
      <div className="flex items-center gap-8 p-4 text-gray-500 text-sm">
        {navbarLinks.map((item, index) => (
          <Link
            href={item.url}
            className="flex gap-2 hover:text-primary transition-colors"
            key={index}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>

      <Link
        href="/products"
        className="flex gap-2 items-center text-primary cursor-pointer hover:opacity-80 transition-opacity"
      >
        <Flame />
        فروش ویژه
      </Link>
    </div>
  );
};

export default HeaderBotton;
