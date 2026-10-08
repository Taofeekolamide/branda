import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getMarket, markets } from "@/lib/markets";

export function generateStaticParams() {
  return Object.keys(markets).map((market) => ({
    market,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;

  const marketConfig = getMarket(market);

  if (!marketConfig) {
    return {
      title: "Checkout | Branda",
      description: "Complete your Branda service order.",
    };
  }

  return {
    title: `Checkout | Branda ${marketConfig.name}`,
    description: "Complete your Branda service order.",
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;

  const marketConfig = getMarket(market);

  if (!marketConfig) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href={`/${market}/cart`}
            className="text-sm font-medium text-gray-500 transition hover:text-pink-500"
          >
            ← Back to cart
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-pink-500">
            Checkout
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Complete your order
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Provide your details and our team will take
            care of the rest.
          </p>
        </div>
      </section>

      {/* Checkout */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <CheckoutForm market={market} />
      </section>
    </main>
  );
}