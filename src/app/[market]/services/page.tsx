import { ServiceCard } from "@/components/services/service-card";
import { ServiceFilters } from "@/components/services/service-filters";
import { ServiceSearch } from "@/components/services/service-search";
import { services } from "@/data/services";
import { getMarket } from "@/lib/markets";

interface ServicesPageProps {
  params: Promise<{
    market: string;
  }>;

  searchParams: Promise<{
    search?: string;
    category?: string;
    industry?: string;
    useCase?: string;
    sort?: string;
  }>;
}

export default async function ServicesPage({
  params,
  searchParams,
}: ServicesPageProps) {
  const { market } = await params;
  const filters = await searchParams;

  const marketConfig = getMarket(market);

  if (!marketConfig) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Market unavailable
          </h1>

          <p className="mt-3 text-gray-500">
            We could not find the selected market.
          </p>
        </div>
      </main>
    );
  }

  const search = filters.search?.toLowerCase() ?? "";
  const category = filters.category ?? "";
  const industry = filters.industry ?? "";
  const useCase = filters.useCase ?? "";
  const sort = filters.sort ?? "popular";

  let filteredServices = services.filter((service) => {
    const matchesSearch =
      !search ||
      service.name.toLowerCase().includes(search) ||
      service.description.toLowerCase().includes(search) ||
      service.industries.some((item) =>
        item.toLowerCase().includes(search)
      ) ||
      service.useCases.some((item) =>
        item.toLowerCase().includes(search)
      );

    const matchesCategory =
      !category || service.category === category;

    const matchesIndustry =
      !industry || service.industries.includes(industry);

    const matchesUseCase =
      !useCase || service.useCases.includes(useCase);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesIndustry &&
      matchesUseCase
    );
  });

  filteredServices = [...filteredServices].sort((a, b) => {
    switch (sort) {
      case "rating":
        return b.rating - a.rating;

      case "price-low":
        return a.startingPrice - b.startingPrice;

      case "price-high":
        return b.startingPrice - a.startingPrice;

      default:
        return b.popularity - a.popularity;
    }
  });

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
            Branda Services
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Everything your brand needs.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Discover professional branding, design, printing,
            photography and marketing services.
          </p>

          <div className="mt-8 max-w-3xl">
            <ServiceSearch />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ServiceFilters />
          </aside>

          <div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                {filteredServices.length}{" "}
                {filteredServices.length === 1
                  ? "service"
                  : "services"}{" "}
                available
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Market: {marketConfig.name}
              </p>
            </div>

            {filteredServices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  No services found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    market={market}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}