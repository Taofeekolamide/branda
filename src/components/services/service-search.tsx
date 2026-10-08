"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ServiceSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSearch(value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="relative">
      <Search
        size={20}
        aria-hidden="true"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="search"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(event) =>
          handleSearch(event.target.value)
        }
        placeholder="Search services..."
        aria-label="Search services"
        className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
      />
    </div>
  );
}