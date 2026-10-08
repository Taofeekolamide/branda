"use client";

import { usePathname, useRouter } from "next/navigation";

import { markets } from "@/lib/markets";

interface MarketSwitcherProps {
  market: string;
}

export function MarketSwitcher({
  market,
}: MarketSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const nextMarket = event.target.value;

    const segments = pathname.split("/");

    segments[1] = nextMarket;

    router.push(segments.join("/") || `/${nextMarket}`);
  }

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">
        Select market
      </span>

      <select
        value={market}
        onChange={handleChange}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
      >
        {Object.entries(markets).map(
          ([code, config]) => (
            <option key={code} value={code}>
              {config.name} ({config.currency})
            </option>
          )
        )}
      </select>
    </label>
  );
}