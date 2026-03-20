import Link from "next/link";
import Image from "next/image";
import Container from "../container/container";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* About */}
          <div className="flex flex-col gap-4">
            <Image src="/logo.svg" width={100} height={50} alt="شاواز" />
            <p className="text-sm text-gray-500 leading-7">
              فروشگاه اینترنتی شاواز، ارائه‌دهنده انواع محصولات بهداشتی و
              آرایشی با کیفیت اصل و قیمت مناسب. ارسال سریع به سراسر ایران.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#646464] font-bold text-sm">دسترسی سریع</h4>
            <div className="flex flex-col gap-2">
              <Link href="/products" className="text-sm text-gray-500 hover:text-primary transition-colors">
                محصولات
              </Link>
              <Link href="/blog" className="text-sm text-gray-500 hover:text-primary transition-colors">
                بلاگ
              </Link>
              <Link href="/about" className="text-sm text-gray-500 hover:text-primary transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors">
                تماس با ما
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#646464] font-bold text-sm">خدمات مشتریان</h4>
            <div className="flex flex-col gap-2">
              <Link href="/profile" className="text-sm text-gray-500 hover:text-primary transition-colors">
                پیگیری سفارش
              </Link>
              <Link href="/cart" className="text-sm text-gray-500 hover:text-primary transition-colors">
                سبد خرید
              </Link>
              <Link href="/auth/login" className="text-sm text-gray-500 hover:text-primary transition-colors">
                ورود / ثبت‌نام
              </Link>
              <Link href="/products" className="text-sm text-gray-500 hover:text-primary transition-colors">
                لیست علاقه‌مندی‌ها
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#646464] font-bold text-sm">ارتباط با ما</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone size={16} />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={16} />
                <span>info@shavaz.ir</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>تهران، خیابان ولیعصر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © تمامی حقوق برای فروشگاه شاواز محفوظ است.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              توسعه‌دهنده: Milad Joodi
            </span>
            <a
              href="https://github.com/MiladJoodi/Shavaz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/joodi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
