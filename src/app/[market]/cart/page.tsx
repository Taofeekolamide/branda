import { MarketCart } from "@/components/cart/market-cart";
import { markets } from "@/lib/markets";

interface CartPageProps {
  params: Promise<{
    market: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(markets).map((market) => ({
    market,
  }));
}

export default async function CartPage({
  params,
}: CartPageProps) {
  const { market } = await params;

  return <MarketCart market={market} />;
}