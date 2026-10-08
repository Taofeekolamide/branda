"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

interface CartButtonProps {
  market: string;
}

export function CartButton({
  market,
}: CartButtonProps) {
  const items = useCartStore((state) => state.items);

  const itemCount = items
    .filter((item) => item.market === market)
    .reduce(
      (total, item) => total + item.quantity,
      0
    );

  return (
    <Link
      href={`/${market}/cart`}
      aria-label={`Shopping cart with ${itemCount} ${
        itemCount === 1 ? "item" : "items"
      }`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:border-pink-300 hover:text-pink-500"
    >
      <ShoppingCart size={19} />

      {itemCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-bold text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}