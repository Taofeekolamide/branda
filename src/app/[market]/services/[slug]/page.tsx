import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OrderPanel } from "@/components/services/order-panel";
import { CartButton } from "@/components/cart/cart-button";

import { getServiceBySlug, services } from "@/data/services";
import { getMarket, markets } from "@/lib/markets";

interface ServiceDetailPageProps {
  params: Promise<{
    market: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(markets).flatMap((market) =>
    services.map((service) => ({
      market,
      slug: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps) {
  const { market, slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Branda",
    };
  }

  const marketConfig = getMarket(market);

  if (!marketConfig) {
    return {
      title: "Service | Branda",
      description: service.description,
    };
  }

  return {
    title: `${service.name} | Branda ${marketConfig.name}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { market, slug } = await params;

  const marketConfig = getMarket(market);
  const service = getServiceBySlug(slug);

  if (!marketConfig || !service) {
    notFound();
  }

  const formatter = new Intl.NumberFormat(
    marketConfig.locale,
    {
      style: "currency",
      currency: marketConfig.currency,
      maximumFractionDigits: 0,
    }
  );

  const formattedPrice = formatter.format(
    service.startingPrice
  );

  const relatedServices = services
    .filter(
      (item) =>
        item.category === service.category &&
        item.slug !== service.slug
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <nav
              aria-label="Breadcrumb"
              className="flex min-w-0 items-center gap-2 text-sm text-gray-500"
            >
              <Link
                href={`/${market}`}
                className="shrink-0 transition hover:text-pink-500"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                href={`/${market}/services`}
                className="shrink-0 transition hover:text-pink-500"
              >
                Services
              </Link>

              <span>/</span>

              <span className="truncate text-gray-900">
                {service.name}
              </span>
            </nav>

            <CartButton market={market} />
          </div>
        </div>
      </div>

      {/* Service information */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100">
              <Image
                src={service.images[0]}
                alt={service.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {service.images.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {service.images.slice(1).map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
                  >
                    <Image
                      src={image}
                      alt={`${service.name} preview ${index + 2}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Service information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
              {service.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {service.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-lg text-gray-700">
                ★ {service.rating}
              </span>

              <span className="text-gray-300">•</span>

              <span className="text-sm text-gray-500">
                {service.turnaround}
              </span>
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {service.description}
            </p>

            {/* Price */}
            <div className="mt-8 rounded-2xl bg-gray-50 p-6">
              <p className="text-sm text-gray-500">
                Starting from
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {formattedPrice}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Prices shown for {marketConfig.name}.
              </p>
            </div>

            <OrderPanel
              service={service}
              market={market}
            />
          </div>
        </div>
      </section>

      {/* Use cases and industries */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
                Perfect for
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Use cases
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {service.useCases.map((useCase) => (
                  <span
                    key={useCase}
                    className="rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
                Designed for
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Industries
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {service.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
              What&apos;s included
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Everything you need to get started.
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Every Branda service is designed to give your
              business professional, ready-to-use creative
              deliverables.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.included.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-sm font-bold text-pink-500">
                  {index + 1}
                </div>

                <p className="mt-4 font-medium leading-6 text-gray-900">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
                You may also like
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Related services
              </h2>
            </div>

            <Link
              href={`/${market}/services`}
              className="shrink-0 text-sm font-semibold text-pink-500 transition hover:text-pink-600"
            >
              View all
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((item) => {
              const relatedPrice = formatter.format(
                item.startingPrice
              );

              return (
                <Link
                  key={item.id}
                  href={`/${market}/services/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-pink-500">
                      {item.category}
                    </p>

                    <h3 className="mt-1 font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Starting from {relatedPrice}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}