import { Order } from "@/types";
import { products } from "./products";

export const orders: Order[] = [
  {
    id: 1001,
    items: [
      { product: products[0], quantity: 2 },
      { product: products[2], quantity: 1 },
    ],
    total: 467050,
    status: "delivered",
    date: "1404/12/14",
    trackingCode: "SHV-98765432",
  },
  {
    id: 1002,
    items: [
      { product: products[8], quantity: 1 },
    ],
    total: 3500000,
    status: "shipped",
    date: "1404/12/18",
    trackingCode: "SHV-12345678",
  },
  {
    id: 1003,
    items: [
      { product: products[3], quantity: 1 },
      { product: products[7], quantity: 2 },
    ],
    total: 460000,
    status: "processing",
    date: "1404/12/20",
    trackingCode: "SHV-55667788",
  },
  {
    id: 1004,
    items: [
      { product: products[16], quantity: 1 },
    ],
    total: 195000,
    status: "cancelled",
    date: "1404/11/25",
    trackingCode: "SHV-11223344",
  },
];
