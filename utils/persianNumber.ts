const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export default function persianNumber(n: string | number): string {
  return String(n).replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
}
