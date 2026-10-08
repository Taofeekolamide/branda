import { getMarket } from "@/lib/markets";

interface SiteFooterProps {
  market: string;
}

export function SiteFooter({ market }: SiteFooterProps) {
  const marketConfig = getMarket(market);

  // Prevent "Cannot read properties of undefined"
  if (!marketConfig) {
    return (
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-sm text-gray-500">
            Branda — Creative services for growing brands.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div>
          <p className="text-xl font-bold tracking-tight text-gray-950">
            Branda
          </p>

          <p className="mt-5 text-sm font-medium text-gray-700">
            Serving {marketConfig.name}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Professional branding, design, printing, photography and creative
            services.
          </p>
        </div>

        <div className="mt-10 border-t pt-6 text-sm text-gray-500">
          © 2026 Branda. All rights reserved.
        </div>
      </div>
    </footer>
  );
}