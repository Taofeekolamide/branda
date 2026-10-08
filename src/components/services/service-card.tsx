import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";
import { getMarket } from "@/lib/markets";

interface ServiceCardProps {
  service: Service;
  market: string;
}

export function ServiceCard({
  service,
  market,
}: ServiceCardProps) {
  const marketConfig = getMarket(market);

  if (!marketConfig) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat(
    marketConfig.locale,
    {
      style: "currency",
      currency: marketConfig.currency,
      maximumFractionDigits: 0,
    }
  ).format(service.startingPrice);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/${market}/services/${service.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={service.images[0]}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
            {service.category}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-semibold text-gray-900">
              {service.name}
            </h2>

            <span className="shrink-0 text-sm font-medium text-gray-500">
              ★ {service.rating}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
            {service.description}
          </p>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500">
                Starting from
              </p>

              <p className="text-lg font-bold text-gray-900">
                {formattedPrice}
              </p>
            </div>

            <span className="rounded-full bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-600">
              View service
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}