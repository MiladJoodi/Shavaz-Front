import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";
import MobileNav from "@/components/header/MobileNav";

const vazirmatn = Vazirmatn({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#d72685",
};

export const metadata: Metadata = {
  title: {
    default: "شاواز | فروشگاه اینترنتی محصولات آرایشی و بهداشتی",
    template: "%s | شاواز",
  },
  description:
    "فروشگاه اینترنتی شاواز، ارائه‌دهنده انواع محصولات بهداشتی و آرایشی با کیفیت اصل و قیمت مناسب",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <Header />
        <div className="min-h-screen pb-16 lg:pb-0">{children}</div>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
