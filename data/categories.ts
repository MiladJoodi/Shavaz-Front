import { Category } from "@/types";

export const categories: Category[] = [
  { id: 1, slug: "arayesh-cheshm", title: "آرایش چشم", image: "01.webp", productCount: 45 },
  { id: 2, slug: "dahan-dandan", title: "دهان و دندان", image: "02.webp", productCount: 32 },
  { id: 3, slug: "atr-odkolon", title: "عطر و ادکلن", image: "03.webp", productCount: 67 },
  { id: 4, slug: "rang-moo", title: "رنگ مو", image: "04.webp", productCount: 28 },
  { id: 5, slug: "lak", title: "لاک", image: "05.webp", productCount: 41 },
  { id: 6, slug: "zed-ofooni", title: "مایع ضدعفونی کننده", image: "06.webp", productCount: 19 },
  { id: 7, slug: "pak-konandeh", title: "پاک کننده آرایش", image: "07.webp", productCount: 35 },
  { id: 8, slug: "losion-roghan-badan", title: "لوسیون و روغن بدن", image: "08.webp", productCount: 52 },
  { id: 9, slug: "arayesh-lab", title: "آرایش لب", image: "09.webp", productCount: 38 },
  { id: 10, slug: "dasmaal-martoob", title: "دستمال مرطوب", image: "10.webp", productCount: 15 },
  { id: 11, slug: "moraghebat-moo", title: "ماسک مو", image: "11.webp", productCount: 43 },
  { id: 12, slug: "zed-tarig", title: "ضد تعریق", image: "12.webp", productCount: 24 },
  { id: 13, slug: "novar-behdashti", title: "نوار بهداشتی", image: "13.webp", productCount: 18 },
  { id: 14, slug: "arayesh-soorat", title: "آرایش صورت", image: "14.webp", productCount: 56 },
  { id: 15, slug: "moraghebat-poost", title: "مراقبت پوست", image: "01.webp", productCount: 72 },
  { id: 16, slug: "zed-aftab", title: "ضد آفتاب", image: "02.webp", productCount: 31 },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
