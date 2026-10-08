"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { getMarket } from "@/lib/markets";

interface MarketCartProps {
  market: string;
}

export function MarketCart({
  market,
}: MarketCartProps) {
  const { items, updateQuantity, removeItem } =
    useCartStore();

  const marketConfig = getMarket(market);

if (!marketConfig) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">
        Loading market...
      </p>
    </main>
  );
}

  const marketItems = items.filter(
    (item) => item.market === market
  );

  const subtotal = marketItems.reduce(
    (total, item) =>
      total + item.unitPrice * item.quantity,
    0
  );

  // ...rest of your existing cart UI
}