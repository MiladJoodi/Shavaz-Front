import persianNumber from "@/utils/persianNumber";

export function formatPrice(price: number): string {
  return persianNumber(price.toLocaleString("en-US"));
}
