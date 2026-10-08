# Branda — Frontend Developer Screening

A responsive multi-market service ordering platform built for the Branda frontend developer screening assessment.

The application allows customers to discover creative and branding services, filter and sort services, view service details, configure orders, manage a cart, and complete checkout.

The project is built with Next.js App Router, TypeScript, Tailwind CSS, Zustand, Zod, and Lucide React.


## Features

### Service Discovery

- Responsive service catalogue
- Search services by name, description, industry, and use case
- Filter by:
  - Category
  - Industry
  - Use case
- Sort by:
  - Popularity
  - Rating
  - Price — low to high
  - Price — high to low
- Filter and sorting state reflected in URL search parameters
- Responsive service cards
- Service detail pages
- Related services

### Service Ordering

Customers can:

- View service information
- Browse service imagery
- Select available service options
- Adjust quantity
- See calculated pricing
- Add configured services to the cart

### Cart

- Persistent cart state using Zustand
- Add and remove services
- Update quantities
- Automatic totals
- Market-aware currency formatting
- Cart state persists between page refreshes

### Checkout

- Customer information form
- Zod-based validation
- Order summary
- Market-specific currency formatting
- Empty-cart handling
- Order completion state

### Multi-Market Support

The application uses market-aware routing:

text
/ng
/us
/uk
/ca


Each market has its own:

- Currency
- Locale
- Market-specific content
- Service URLs
- Navigation URLs

Examples:

text
/ng/services
/us/services
/uk/services
/ca/services


This structure makes it possible to expand the platform into additional markets without duplicating the application.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework and routing |
| TypeScript | Type safety |
| React | UI |
| Tailwind CSS | Styling and responsive design |
| Zustand | Client-side cart state |
| Zod | Form validation |
| Lucide React | Icons |
| next/image | Optimized image delivery |
| Vercel | Deployment |

---

## Architecture

The application uses the Next.js App Router with market-based dynamic routing.

text
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   │
│   └── [market]/
│       ├── layout.tsx
│       ├── page.tsx
│       │
│       ├── services/
│       │   ├── page.tsx
│       │   ├── loading.tsx
│       │   └── [slug]/
│       │       └── page.tsx
│       │
│       ├── cart/
│       │   └── page.tsx
│       │
│       └── checkout/
│           └── page.tsx
│
├── components/
│   ├── cart/
│   ├── checkout/
│   ├── layout/
│   └── services/
│
├── data/
│   └── services.ts
│
├── lib/
│   └── markets.ts
│
├── stores/
│   └── cart-store.ts
│
└── types/
    └── index.ts


### Routing

The `[market]` segment provides market-aware routing while keeping the application structure shared across markets.

For example:

text
/[market]
/[market]/services
/[market]/services/[slug]
/[market]/cart
/[market]/checkout


Static market parameters are generated from the supported market configuration.

---

## Server vs Client Components

The application follows a server-first approach.

### Server Components

Used for:

- Market layouts
- Home pages
- Service catalogue
- Service detail pages
- Metadata generation
- Static/mock service data processing

This keeps unnecessary JavaScript out of the browser.

### Client Components

Used only where interaction or browser state is required:

- Service search/filter controls
- Order configuration
- Cart state
- Checkout form

Zustand is used exclusively for interactive cart state.

---

## State Management

Cart state is managed using Zustand with persistence.

text
Service Page
     │
     ▼
Order Configuration
     │
     ▼
Zustand Cart Store
     │
     ├── Add Item
     ├── Update Quantity
     ├── Remove Item
     └── Clear Cart
     │
     ▼
Cart
     │
     ▼
Checkout


Cart data is persisted using Zustand's persistence middleware so customers do not lose their cart after refreshing the page.

---

## Validation

Checkout input is validated using Zod.

Validation is performed before submitting the order and provides structured validation errors for the customer.

This keeps validation rules explicit, typed, and reusable.

---

## Performance Decisions

Several decisions were made with production performance in mind.

### Image Optimization

Service images use `next/image` rather than raw `<img>` elements.

Images use responsive sizing through the `sizes` attribute so the browser can request an appropriate image size for the device.

Example:

tsx
<Image
  src={service.images[0]}
  alt={service.name}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>


### Server-First Rendering

Service data filtering and page rendering are handled on the server where possible.

Interactive functionality is isolated into Client Components.

This reduces client-side JavaScript and keeps the initial page lightweight.

### URL-Based Filtering

Search and filtering use URL search parameters rather than storing catalogue filters entirely in client state.

For example:

text
/ng/services?category=Digital&sort=rating


This provides:

- Shareable filtered URLs
- Browser navigation support
- Better page state persistence
- Server-side filtering

### Static Generation

Known markets and service routes are generated from the application's mock data.

This provides fast initial page rendering while keeping the routing architecture ready for a future API/data layer.

---

## Accessibility & Responsive Design

The interface was designed mobile-first and tested across desktop and mobile layouts.

Accessibility considerations include:

- Semantic HTML
- Proper heading hierarchy
- Descriptive image `alt` text
- Accessible form labels
- Keyboard-friendly links and controls
- Visible interactive states
- Responsive navigation
- Sufficient text/background contrast

---

## Data Layer

The current implementation uses local mock data:

text
src/data/services.ts


This was intentional because the assessment does not require a database.

The service data is separated from the UI so it can later be replaced with:

text
API
 ↓
Service Layer
 ↓
Next.js Server Components
 ↓
UI


without requiring a major component rewrite.

---

## Markets

Supported markets currently include:

| Market | Code | Currency | Locale |
|---|---|---|---|
| Nigeria | `ng` | NGN | `en-NG` |
| United States | `us` | USD | `en-US` |
| United Kingdom | `uk` | GBP | `en-GB` |
| Canada | `ca` | CAD | `en-CA` |

Market configuration is centralized in:

text
src/lib/markets.ts


---

## Getting Started

### Requirements

- Node.js 20+
- npm

### Installation

Clone the repository:


git clone https://github.com/Taofeekolamide/branda.git


Install dependencies:


npm install


Start the development server:


npm run dev


Open:

text
http://localhost:3000/ng


---

## Production Build

Create a production build:


npm run build


Start the production server:


npm start


---

## Environment Variables

The current assessment implementation does not require external environment variables.

If a future backend or third-party service is introduced, environment-specific configuration can be added through `.env.local`.

---

## Future Improvements

For a production implementation, I would extend the application with:

- Real backend/API integration
- Authentication and role-based access
- Order management
- Payment integration
- Customer accounts
- Admin and staff dashboards
- CMS/content management
- Real-time order status
- Database-backed services and markets
- Server-side pagination/infinite loading
- CDN/image transformation
- Automated testing
- CI/CD pipeline
- Analytics and error monitoring
- SEO enhancements including canonical URLs and `hreflang`
- Comprehensive Core Web Vitals monitoring

---

## Assessment Coverage

| Assessment Area | Implementation |
|---|---|
| Responsive service ordering | ✅ |
| Search | ✅ |
| Category filtering | ✅ |
| Additional filters | ✅ |
| Sorting | ✅ |
| URL search parameters | ✅ |
| Service detail pages | ✅ |
| Service options | ✅ |
| Quantity selection | ✅ |
| Cart | ✅ |
| Checkout | ✅ |
| Zod validation | ✅ |
| Multi-market routing | ✅ |
| Market-specific currencies | ✅ |
| Responsive UI | ✅ |
| Loading state | ✅ |
| Empty states | ✅ |
| Metadata | ✅ |
| Image optimization | ✅ |
| Server/client component separation | ✅ |
| Zustand state management | ✅ |
| Performance considerations | ✅ |

---

## Design Direction

The interface follows a clean, minimal visual direction based on the Branda brand.

Primary brand accent:

text
#EF427A


The design prioritizes:

- Clear hierarchy
- Strong typography
- Generous spacing
- Simple navigation
- Fast service discovery
- Mobile responsiveness
- Minimal visual clutter

Task 4 — Frontend Review of Branda.com.ng

Three things working well
1. Strong value proposition and content hierarchy
The homepage communicates Branda's positioning quickly through messaging around being an "all-in-one branding partner." The ecosystem concept is reinforced throughout the page, making it clear that Branda offers more than traditional printing. Branda Nigeria
2. Strong social proof and credibility
The site makes good use of client logos, testimonials, portfolio work and business statistics. The projects page, for example, highlights companies served and previous branding work, while the homepage includes testimonials and recognizable client brands. Branda Nigeria
3. Broad content and service discovery
There is a substantial amount of useful content across services, projects, FAQs and educational articles. The product catalogue also supports actual online ordering, including product options and pricing, rather than functioning only as a marketing website. Branda Nigeria
Five areas that could be improved
1. Navigation and information architecture
Because Branda offers many different services, navigation can become overwhelming. The V2 experience should organize the ecosystem around clearer customer intents such as Print, Gifts, Digital, Studio and Workspace, while keeping the primary actions such as Shop, Get a Quote and Contact prominent.
2. Mobile-first experience
The amount of content on the homepage creates a long scrolling experience. A mobile-first redesign should prioritize the most important conversion paths and progressively reveal secondary information rather than presenting every section with equal visual weight.
3. Stronger consistency across the ecosystem
Branda has multiple service areas and content types. A shared design system with standardized cards, buttons, spacing, typography, filters, product/service layouts and CTA patterns would make the different parts of the platform feel like one product rather than separate experiences.
4. Product discovery and ordering UX
The catalogue contains a large number of products — some categories expose more than 100 products — so search, filtering, sorting and pagination become particularly important. Branda Nigeria
For V2, I would make product/service discovery more task-oriented, with persistent filters, clear result counts, better sorting and a streamlined path from discovery → configuration → cart → checkout.
5. Performance and accessibility
The site is highly visual and contains many images and content sections. V2 should prioritize optimized responsive images, lazy loading for below-the-fold media, appropriate image dimensions, reduced client-side JavaScript and careful font loading.
I would also run regular Lighthouse/PageSpeed audits and improve semantic HTML, keyboard navigation, focus states, form labels, image alternatives and color contrast.
Responsiveness, UX and mobile
The biggest opportunity is reducing complexity on smaller screens.
Branda's breadth is a competitive advantage, but it can also create cognitive load. On mobile, I would prioritize:
- A compact navigation system
- Persistent/high-visibility search
- Clear service categories
- Sticky or easily accessible cart/action controls
- Shorter content sections
- Responsive image sizing
- Touch-friendly controls
- Simplified checkout
- Clear loading, error and empty states

---

## Author

Full Name: taofeek Olamide

Web Developer

Built as part of the Branda Frontend Developer Screening Assessment.