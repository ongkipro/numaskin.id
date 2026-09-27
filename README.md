# Numa Skin Official Storefront (`numaskin.id`)

> **Platform:** Shopify Hydrogen (`@shopify/hydrogen@^2026.4.5`) · **Engine:** React Router v7 (`7.16.0`) + Vite
> **Runtime:** Shopify Oxygen Edge (Cloudflare Workers base) · **Styling:** Tailwind CSS v4
> **Brand Profile:** J-Beauty Clinical Mineral Skincare · Anti-Aging & Barrier Longevity
> **Brand Ambassadors:** Sahrul Gunawan & Dine Pearl (#AwetMudaBersama)

---

## 📚 Project Documentation Suite

All canonical product requirements, brand guidelines, UI/UX benchmarks, and technical architecture are documented under `docs/`:

1. [**`DESIGN.md`**](file:///Users/ongki/Projects/numaskin.id/DESIGN.md)
   - Master Design Specification & Component Anatomy: Header, Hero, Routine Stepper, Product Card, PDP, Cart Drawer, Sticky Mobile CTA, Footer.
   - Design tokens, Tailwind CSS v4 setup, WCAG AA contrast audit, and Zero-AI-Slop checklist.

2. [**`docs/01-PRD.md`**](file:///Users/ongki/Projects/numaskin.id/docs/01-PRD.md)
   - Product vision, market positioning, target personas, customer journeys.
   - Core functional specifications for Homepage, PLP, PDP, and Cart Drawer.
   - Technical invariants, compliance rules, and delivery roadmap.

3. [**`docs/02-BRAND-AND-DESIGN-SYSTEM.md`**](file:///Users/ongki/Projects/numaskin.id/docs/02-BRAND-AND-DESIGN-SYSTEM.md)
   - Brand marks (Kanji/Katakana `ヌマスキン`, Latin Wordmark, Botanical Wave 'N' Crest).
   - Color tokens: Marine Navy (`#132A5C`), Ocean Cyan (`#269BA8`), Sea Mist Surface (`#EBF5F8`).
   - Typography hierarchy (`DM Serif Display` + `Inter` + `JetBrains Mono`).
   - Component library blueprints and radius scale.

4. [**`docs/03-UI-UX-RESEARCH-AND-BENCHMARKS.md`**](file:///Users/ongki/Projects/numaskin.id/docs/03-UI-UX-RESEARCH-AND-BENCHMARKS.md)
   - Teardown of global & domestic benchmarks: Rhode Skin, Somethinc, Skintific, Glossier, Aesop.
   - Strategic Hybrid Model: Editorial luxury visual surface + Indonesian high-conversion commercial engine.
   - Conversion Rate Optimization (CRO) playbooks, AOV bundling strategies, and user funnels.

5. [**`docs/04-CATALOG-AND-ARCHITECTURE.md`**](file:///Users/ongki/Projects/numaskin.id/docs/04-CATALOG-AND-ARCHITECTURE.md)
   - Master catalog mapping: 8 Core Singles + 42 Bundles + 7 Collections with full BPOM IDs.
   - Shopify Oxygen runtime architecture, React Router v7 framework loader patterns.
   - Storefront API GraphQL schemas, predictive search limits, currency formatters, and cross-domain checkout session linkers.

6. [**`SYSTEM-MAP.md`**](file:///Users/ongki/Projects/numaskin.id/SYSTEM-MAP.md)
   - Comprehensive Developer Navigation Map: Page-by-page specifications, data providers, component hierarchies, state management, and fallback dummy engine.

7. [**`PAGES-MAP.md`**](file:///Users/ongki/Projects/numaskin.id/PAGES-MAP.md)
   - Dynamic route taxonomy, template layout hierarchy, and component composition map.

8. [**`STATUS.md`**](file:///Users/ongki/Projects/numaskin.id/STATUS.md)
   - Live delivery progress tracker, architectural decisions, and next implementation milestones.

---

## 📂 Project Directory Structure

```
numaskin.id/
├── docs/                                  # Canonical Architecture & Planning Artifacts
│   ├── 01-PRD.md                          # Product Requirements Document
│   ├── 02-BRAND-AND-DESIGN-SYSTEM.md      # Brand Identity, Color System, Zero-Slop Rules
│   ├── 03-UI-UX-RESEARCH-AND-BENCHMARKS.md# D2C Skincare Benchmarks (Rhode, Skintific)
│   └── 04-CATALOG-AND-ARCHITECTURE.md     # Catalog Master & Hydrogen Engine Spec
│
├── data/                                  # Cleaned & Validated Catalog Data (Zero Marketplace Slop)
│   ├── shopify_clean_catalog.json         # Master 8 Singles + 42 Bundles + 7 Collections
│   ├── banners.json                       # Official Shop Banners & Campaign Assets Metadata
│   └── landing_images.json                # Landing Page Visual Assets Inventory
│
├── scripts/                               # Maintenance & Data Transformation Tooling
│   └── build_clean_catalog.py             # Shopee to Hydrogen Clean Catalog Pipeline
│
├── PAGES-MAP.md                           # Site Route Tree & Layout Hierarchy
├── README.md                              # This Documentation Index
└── STATUS.md                              # Project Lifecycle Tracker & Milestones
```

---

## ⚡ Key Hydrogen Technical Invariants

- **React Router v7 Framework Mode:** Route loaders return plain data objects directly (`return await promise;`), **never** wrapped in `Response.json(...)`.
- **Predictive Search Clamp:** The Storefront API `predictiveSearch` query limit must be clamped strictly to `Math.min(10, Math.max(1, limit))`.
- **Rupiah Formatting:** All pricing rendered via `formatRupiah` without trailing decimal cents (e.g. `Rp 79.000`).
- **Variant Purity:** Single-variant products suppress synthetic Shopify titles (`Title: Default Title`).
- **SEO & 404 Shield:** Dual-layer defense enforcing `noindex, nofollow` in HTML meta and edge HTTP headers (`X-Robots-Tag`) on preview/staging domains.
