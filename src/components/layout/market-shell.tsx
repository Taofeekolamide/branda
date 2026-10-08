import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface MarketShellProps {
  market: string;
  children: React.ReactNode;
}

export function MarketShell({
  market,
  children,
}: MarketShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader market={market} />

      <div className="flex-1">
        {children}
      </div>

      <SiteFooter market={market} />
    </div>
  );
}