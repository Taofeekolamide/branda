import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { MarketSwitcher } from "@/components/layout/market-switcher";

interface SiteHeaderProps {
  market: string;
}

export function SiteHeader({ market }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={`/${market}`}
          className="text-xl font-bold tracking-tight text-gray-950"
        >
          Branda
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={`/${market}`}
            className="text-sm font-medium text-gray-700 transition hover:text-pink-500"
          >
            Home
          </Link>

          <Link
            href={`/${market}/services`}
            className="text-sm font-medium text-gray-700 transition hover:text-pink-500"
          >
            Services
          </Link>

          <Link
            href={`/${market}/cart`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-pink-500"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-pink-50 px-3 py-1 text-sm font-semibold text-pink-600">
  {market.toUpperCase()}
</span>

          <Link
            href={`/${market}/cart`}
            aria-label="View cart"
            className="rounded-xl p-2 text-gray-700 transition hover:bg-pink-50 hover:text-pink-500 md:hidden"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}