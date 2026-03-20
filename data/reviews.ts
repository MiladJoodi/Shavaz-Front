import { Review } from "@/types";

export const reviews: Review[] = [
  { id: 1, author: "مریم کریمی", rating: 5, comment: "عالی بود! نتیجه خیلی خوبی داشت و کاملاً راضی هستم.", date: "1404/12/10", productId: 1 },
  { id: 2, author: "زهرا محمدی", rating: 4, comment: "کیفیت خوبی داره ولی قیمتش یکم بالاست.", date: "1404/12/08", productId: 1 },
  { id: 3, author: "سارا نوری", rating: 5, comment: "بهترین محصولی بود که تا حالا استفاده کردم.", date: "1404/12/05", productId: 1 },
  { id: 4, author: "فاطمه رضایی", rating: 3, comment: "بد نیست ولی انتظار بیشتری داشتم.", date: "1404/12/01", productId: 2 },
  { id: 5, author: "نازنین احمدی", rating: 5, comment: "فوق‌العاده! پوستم خیلی نرم و لطیف شده.", date: "1404/11/28", productId: 2 },
  { id: 6, author: "لیلا جعفری", rating: 4, comment: "محصول خوبیه، بسته‌بندی هم عالی بود.", date: "1404/11/25", productId: 3 },
  { id: 7, author: "آرزو حسینی", rating: 5, comment: "من عاشق این برند هستم. همیشه کیفیت بالایی دارن.", date: "1404/11/20", productId: 3 },
  { id: 8, author: "شیما کاظمی", rating: 4, comment: "ارسال سریع بود و محصول هم خوب بود.", date: "1404/11/18", productId: 4 },
  { id: 9, author: "پریسا عباسی", rating: 5, comment: "ریزش موهام خیلی کمتر شده. ممنون!", date: "1404/11/15", productId: 4 },
  { id: 10, author: "مهسا طاهری", rating: 4, comment: "برای پوست دور چشم خیلی موثره.", date: "1404/11/12", productId: 5 },
  { id: 11, author: "ندا صادقی", rating: 3, comment: "بوش یکم تند بود ولی در کل خوبه.", date: "1404/11/10", productId: 6 },
  { id: 12, author: "هانیه موسوی", rating: 5, comment: "بهترین ضد آفتابی که استفاده کردم!", date: "1404/11/05", productId: 6 },
];

export function getReviewsByProductId(productId: number): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
