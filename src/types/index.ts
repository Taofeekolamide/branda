export type ServiceCategory =
  | "Digital"
  | "Gifts"
  | "Create"
  | "Studio"
  | "Prints";

export interface ServiceOption {
  id: string;
  name: string;
  priceModifier: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  startingPrice: number;
  discount?: number;
  popularity: number;
  rating: number;
  turnaround: string;
  useCases: string[];
  industries: string[];
  images: string[];
  included: string[];
  options?: ServiceOption[];
}