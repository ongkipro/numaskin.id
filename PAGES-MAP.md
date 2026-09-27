# Pages & Routes Map — Numa Skin (`numaskin.id`)

> **Platform:** Shopify Hydrogen (`@shopify/hydrogen@^2026.4.5`) · **Engine:** React Router v7 (`7.16.0`)
> **Runtime:** Shopify Oxygen Edge Worker

---

## 1. Route Tree & Layout Hierarchy

```
app/
├── root.tsx                           # Global HTML Shell, Font Prefetch, Theme Tokens, Context
└── routes/
    ├── _index.tsx                     # [/] Homepage (Hero, Routine Stepper, Best Sellers, Proof)
    │
    ├── products.$handle.tsx           # [/products/:handle] PDP (Zoom Gallery, Sticky Mobile CTA, Tabs)
    │
    ├── collections._index.tsx         # [/collections] All Collections Moodboard & Directory
    ├── collections.$handle.tsx        # [/collections/:handle] PLP (Faceted Filters, 4-Col Grid)
    ├── collections.all.tsx            # [/collections/all] Complete Product Catalog
    │
    ├── cart.tsx                       # [/cart] Full Page Cart / Drawer Mutation Endpoint
    ├── search.tsx                     # [/search] Live Predictive Search (Clamped 1..10)
    │
    ├── pages.about.tsx                # [/pages/about] The Numa Story & Japanese Marine Heritage
    ├── pages.science.tsx              # [/pages/science] Ulleung Deep Sea Water & Cellular Actives
    ├── pages.bpom.tsx                 # [/pages/bpom] Official BPOM Certification Verification
    ├── pages.faq.tsx                  # [/pages/faq] Customer Service, Shipping & Safety FAQ
    ├── pages.$handle.tsx              # [/pages/:handle] Generic CMS Page
    │
    ├── account/
    │   ├── login.tsx                  # [/account/login] Customer Account API v2 PKCE Flow
    │   ├── authorize.tsx              # [/account/authorize] OAuth Callback Handler
    │   ├── index.tsx                  # [/account] Profile Overview & Recent Orders
    │   └── orders.$id.tsx             # [/account/orders/:id] Order Tracking & Receipt
    │
    ├── sitemap[.]xml.tsx              # [/sitemap.xml] Dynamic Edge SEO Sitemap
    ├── robots[.]txt.tsx               # [/robots.txt] Dynamic Robots Policy with Staging Shield
    └── $.tsx                          # [/*] 404 Catch-All & 301 Redirect Engine
```

---

## 2. Page & Component Matrix

| Route | Page Name | Primary Template Components | Key Data Dependencies |
|:---|:---|:---|:---|
| `/` | **Homepage** | `<Header />`<br>`<HeroBanner />`<br>`<TrustBadgesBar />`<br>`<RoutineStepper />`<br>`<FeaturedSinglesGrid />`<br>`<IngredientSpotlight />`<br>`<AmbassadorSpotlight />`<br>`<BundleSavingsMatrix />`<br>`<ReviewsCarousel />`<br>`<FaqAccordion />`<br>`<Footer />` | Featured Collection query, Hero banner query, Best sellers fragment |
| `/products/$handle` | **Product Detail Page** | `<ProductGallery />`<br>`<ProductHeader />`<br>`<VariantPicker />`<br>`<RoutineUpsellCheckbox />`<br>`<ProductTabs />`<br>`<StickyMobileCTA />`<br>`<RelatedProducts />` | `ProductCore` GraphQL fragment, recommended products, inventory level |
| `/collections/$handle` | **Collection PLP** | `<CollectionHero />`<br>`<FilterDrawer />`<br>`<ActiveFilterPills />`<br>`<SortDropdown />`<br>`<ProductGrid4Col />`<br>`<Pagination />` | `CollectionCore` GraphQL fragment, product pagination (multiples of 4) |
| `/collections` | **Collections Directory** | `<DirectoryHeader />`<br>`<CollectionMoodboardGrid />` | List of 7 official collections |
| `/cart` / Drawer | **Slide-out Cart** | `<CartDrawer />`<br>`<FreeShippingMeter />`<br>`<CartLineItem />`<br>`<InCartUpsell />`<br>`<CheckoutButton />` | `CartCore` fragment, `cartLinesUpdate`, `cartLinesRemove` mutations |
| `/search` | **Predictive Search** | `<SearchInputModal />`<br>`<SearchHistoryPills />`<br>`<PredictiveResultCard />` | Storefront API `predictiveSearch` query (clamped to max 10 results) |
