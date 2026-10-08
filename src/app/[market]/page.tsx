import Link from "next/link";
import { getMarket, markets } from "@/lib/markets";

export function generateStaticParams() {
  return Object.keys(markets).map((market) => ({
    market,
  }));
}

export default async function MarketHome({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  const marketConfig = getMarket(market);

  if (!marketConfig) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Market not found
          </h1>

          <p className="mt-3 text-gray-500">
            The market "{market}" does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
          Branda
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-950">
          Welcome to Branda {marketConfig.name}
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-gray-600">
          Professional branding, design, printing, photography and creative
          services.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href={`/${market}/services`}
            className="rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white"
          >
            Browse services
          </Link>

          <Link
            href={`/${market}/cart`}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-900"
          >
            View cart
          </Link>
        </div>
      </section>
    </main>
  );
}