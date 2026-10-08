export const markets = {
  ng: {
    code: "NG",
    name: "Nigeria",
    currency: "NGN",
    locale: "en-NG",
  },
  us: {
    code: "US",
    name: "United States",
    currency: "USD",
    locale: "en-US",
  },
  uk: {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    locale: "en-GB",
  },
  ca: {
    code: "CA",
    name: "Canada",
    currency: "CAD",
    locale: "en-CA",
  },
} as const;

export type MarketCode = keyof typeof markets;

export type Market = (typeof markets)[MarketCode];

export function isMarketCode(
  value: unknown
): value is MarketCode {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(markets, value)
  );
}

export function getMarket(
  code: string | undefined | null
): Market | undefined {
  if (!isMarketCode(code)) {
    return undefined;
  }

  return markets[code];
}