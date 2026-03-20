import Image from "next/image";
import { Github, Linkedin, Heart, Shield, Truck, Headphones } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import SectionTitle from "@/components/shared/SectionTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "درباره فروشگاه اینترنتی شاواز و تیم توسعه‌دهنده",
};

const features = [
  {
    icon: Shield,
    title: "ضمانت اصالت کالا",
    description: "تمامی محصولات با ضمانت اصالت و تاریخ انقضا ارسال می‌شوند.",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    description: "ارسال به تمام نقاط ایران با بسته‌بندی استاندارد و ایمن.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی ۲۴/۷",
    description: "تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات شما هستند.",
  },
  {
    icon: Heart,
    title: "رضایت مشتری",
    description: "اولویت ما رضایت شما از خرید و تجربه‌ای عالی است.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Container>
        <Breadcrumb items={[{ label: "درباره ما" }]} />

        <SectionTitle title="درباره شاواز" subtitle="داستان ما و ارزش‌هایمان" />

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-l from-primary/5 to-secondary/5 rounded-lg p-8">
            <p className="text-[#646464] leading-8 text-sm mb-4">
              فروشگاه اینترنتی شاواز با هدف ارائه محصولات آرایشی و بهداشتی اصل با
              قیمت مناسب فعالیت خود را آغاز کرده است. ما معتقدیم هر فردی حق دارد
              به محصولات با کیفیت و اصل دسترسی داشته باشد.
            </p>
            <p className="text-[#646464] leading-8 text-sm mb-4">
              تیم متخصص ما با دقت بالا محصولات را از منابع معتبر تهیه کرده و با
              بسته‌بندی ایمن به دست شما می‌رساند. رضایت مشتریان و ارائه بهترین
              تجربه خرید آنلاین، مهم‌ترین اولویت ما است.
            </p>
            <p className="text-[#646464] leading-8 text-sm">
              ما به ارائه مشاوره تخصصی در زمینه محصولات آرایشی و بهداشتی نیز
              متعهد هستیم و در بلاگ شاواز آخرین نکات و ترندهای زیبایی را با شما
              به اشتراک می‌گذاریم.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3 border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-bold text-[#646464] text-sm">{feature.title}</h3>
              <p className="text-xs text-gray-400 leading-5">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Developer Section */}
        <div className="max-w-lg mx-auto mb-16">
          <div className="border border-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-lg font-bold text-[#646464] mb-2">توسعه‌دهنده</h3>
            <p className="text-2xl font-bold text-primary mb-2">Milad Joodi</p>
            <p className="text-sm text-gray-400 mb-4 leading-6">
              توسعه‌دهنده فرانت‌اند با تمرکز بر React و Next.js
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/MiladJoodi/Shavaz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/joodi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
