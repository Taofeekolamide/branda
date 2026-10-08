"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  "Digital",
  "Gifts",
  "Create",
  "Studio",
  "Prints",
];

const industries = [
  "Technology",
  "Retail",
  "Finance",
  "Healthcare",
  "Food",
  "Entertainment",
];

const useCases = [
  "Branding",
  "Marketing",
  "Events",
  "Corporate",
  "Promotions",
];

export function ServiceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function clearFilters() {
    router.push(pathname);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-3 text-sm font-semibold text-gray-900">
          Category
        </h2>

        <div className="space-y-1">
          {categories.map((category) => {
            const active =
              searchParams.get("category") === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  updateFilter("category", category)
                }
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  active
                    ? "bg-pink-50 font-semibold text-pink-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="industry"
          className="mb-3 block text-sm font-semibold text-gray-900"
        >
          Industry
        </label>

        <select
          id="industry"
          value={searchParams.get("industry") ?? ""}
          onChange={(event) =>
            updateFilter("industry", event.target.value)
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All industries</option>

          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="useCase"
          className="mb-3 block text-sm font-semibold text-gray-900"
        >
          Use case
        </label>

        <select
          id="useCase"
          value={searchParams.get("useCase") ?? ""}
          onChange={(event) =>
            updateFilter("useCase", event.target.value)
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All use cases</option>

          {useCases.map((useCase) => (
            <option key={useCase} value={useCase}>
              {useCase}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="sort"
          className="mb-3 block text-sm font-semibold text-gray-900"
        >
          Sort by
        </label>

        <select
          id="sort"
          value={searchParams.get("sort") ?? "popular"}
          onChange={(event) =>
            updateFilter("sort", event.target.value)
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
        >
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">
            Price: High to Low
          </option>
        </select>
      </div>

      <button
        type="button"
        onClick={clearFilters}
        className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        Clear filters
      </button>
    </div>
  );
}