import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "logo-design",
    slug: "logo-design",
    name: "Logo Design",
    category: "Digital",
    description:
      "Create a memorable and professional logo that gives your brand a distinctive visual identity.",
    startingPrice: 75000,
    popularity: 98,
    rating: 4.9,
    turnaround: "3–5 business days",
    useCases: ["Branding", "Startup", "Rebranding"],
    industries: ["Technology", "Retail", "Finance"],
    images: [
      "/images/services/logo-design-1.webp",
      "/images/services/logo-design-2.webp",
    ],
    included: [
      "3 initial logo concepts",
      "2 revision rounds",
      "Final source files",
      "PNG and SVG exports",
    ],
    options: [
      {
        id: "basic",
        name: "Basic",
        priceModifier: 0,
      },
      {
        id: "premium",
        name: "Premium",
        priceModifier: 50000,
      },
    ],
  },

  {
    id: "brand-identity",
    slug: "brand-identity",
    name: "Brand Identity",
    category: "Digital",
    description:
      "Develop a complete visual identity system that keeps your brand consistent across every customer touchpoint.",
    startingPrice: 250000,
    popularity: 96,
    rating: 4.9,
    turnaround: "7–14 business days",
    useCases: ["Branding", "Rebranding", "Corporate"],
    industries: ["Technology", "Finance", "Healthcare"],
    images: [
      "/images/services/brand-identity-1.webp",
      "/images/services/brand-identity-2.webp",
    ],
    included: [
      "Logo system",
      "Color palette",
      "Typography system",
      "Brand guidelines",
      "Source files",
    ],
    options: [
      {
        id: "starter",
        name: "Starter",
        priceModifier: 0,
      },
      {
        id: "complete",
        name: "Complete",
        priceModifier: 150000,
      },
    ],
  },

  {
    id: "business-cards",
    slug: "business-cards",
    name: "Business Cards",
    category: "Create",
    description:
      "Make a strong first impression with premium business cards designed around your brand.",
    startingPrice: 15000,
    popularity: 95,
    rating: 4.8,
    turnaround: "2–4 business days",
    useCases: ["Corporate", "Networking", "Branding"],
    industries: ["Finance", "Professional Services", "Real Estate"],
    images: [
      "/images/services/business-cards-1.webp",
      "/images/services/business-cards-2.webp",
    ],
    included: [
      "Professional design",
      "Print-ready artwork",
      "Premium card stock",
      "High-quality printing",
    ],
    options: [
      {
        id: "standard",
        name: "Standard",
        priceModifier: 0,
      },
      {
        id: "premium",
        name: "Premium Finish",
        priceModifier: 10000,
      },
    ],
  },

  {
    id: "product-photography",
    slug: "product-photography",
    name: "Product Photography",
    category: "Studio",
    description:
      "Showcase your products with clean, professional photography created for e-commerce and marketing.",
    startingPrice: 75000,
    popularity: 87,
    rating: 4.8,
    turnaround: "3–5 business days",
    useCases: ["E-commerce", "Marketing", "Product Launch"],
    industries: ["Retail", "Beauty", "Food"],
    images: [
      "/images/services/product-photography-1.webp",
      "/images/services/product-photography-2.webp",
    ],
    included: [
      "Professional studio setup",
      "Product styling",
      "High-resolution photos",
      "Basic retouching",
    ],
  },

  {
    id: "roll-up-banner",
    slug: "roll-up-banner",
    name: "Roll-Up Banner",
    category: "Prints",
    description:
      "Take your branding anywhere with portable roll-up banners designed for events, offices and promotions.",
    startingPrice: 45000,
    popularity: 88,
    rating: 4.7,
    turnaround: "2–4 business days",
    useCases: ["Events", "Marketing", "Corporate"],
    industries: ["Corporate", "Retail", "Education"],
    images: [
      "/images/services/roll-up-banner-1.webp",
      "/images/services/roll-up-banner-2.webp",
    ],
    included: [
      "Custom banner design",
      "High-resolution printing",
      "Roll-up stand",
      "Carry bag",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}