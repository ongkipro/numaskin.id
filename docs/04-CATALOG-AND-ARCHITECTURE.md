# Catalog Specification & Technical Architecture

> **Storefront:** [numaskin.id](https://numaskin.id) · **Stack:** Shopify Hydrogen (`@shopify/hydrogen@^2026.4.5`)
> **Framework:** React Router v7 (`7.16.0`) Framework Mode · **Styling:** Tailwind CSS v4 · **Runtime:** Shopify Oxygen Edge

---

## 1. Master Catalog Architecture

The canonical Numa Skin catalog is synchronized with `data/shopify_clean_catalog.json` and comprises **8 Core Singles**, **42 Curated Bundles**, and **7 Navigation Collections**.

### 1.1 The 8 Core Singles Master Reference

| Handle | Product Name | Subtitle | Official Price | Normal Price | BPOM No. | Key Actives | Netto |
|:---|:---|:---|:---|:---|:---|:---|:---|
| `numa-skin-deep-sea-water-facial-wash-100ml` | **Numa Skin Deep Sea Water Facial Wash Gel 100ml** | *Pembersih Wajah Lembut Anti-Aging & Mencerahkan dengan 5% Niacinamide* | **Rp 68.999** | ~~Rp 98.750~~ | `NA18241203644` | Ulleung Deep Sea Water, 5% Niacinamide, Vitamin E & Glycerin | 100 ml |
| `numa-skin-deep-sea-water-treatment-lotion-150ml` | **Numa Skin Deep Sea Water Treatment Lotion 150ml** | *Hydrating Toner & Essence Anti-Aging untuk Memperkuat Skin Barrier* | **Rp 79.000** | ~~Rp 123.750~~ | `NA18220101675` | Pristine Deep Sea Water, Multi-Moisturizing Complex, Anti-Irritant Actives | 150 ml |
| `numa-skin-deep-sea-water-treatment-lotion-50ml` | **Numa Skin Deep Sea Water Treatment Lotion 50ml** | *Hydrating Toner Travel Size untuk Kelembapan Kulit Kapan Saja* | **Rp 79.000** | ~~Rp 123.750~~ | `NA18220101675` | Pristine Deep Sea Water, Multi-Moisturizing Complex | 50 ml |
| `numa-skin-adenosine-deep-sea-water-moisturizer-30g` | **Numa Skin Adenosine Deep Sea Water Moisturizer 30g** | *Pelembap Intensif Anti-Aging untuk Mengunci Elastisitas & Nutrisi Kulit* | **Rp 78.999** | ~~Rp 121.250~~ | `NA18230107871` | Adenosine, Deep Sea Water Infusion, Phytosqualane | 30 g |
| `numa-skin-calming-barrier-gloss-gel-moisturizer-30ml` | **Numa Skin Calming Barrier Gloss Gel Moisturizer 30ml** | *Gel Pelembap Ringan Penenang Kulit untuk Tampilan Sehat & Dewy Glow* | **Rp 79.000** | ~~Rp 123.750~~ | `NA18230100779` | Meadowestolide, Astragalus Root Extract, Ceramide Complex | 30 ml |
| `numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g` | **Numa Skin PDRN Alpha Arbutin Tone-Up Day Cream 30g** | *Krim Pagi Pencerah Instan & Perawatan Anti-Aging dengan UV Protection* | **Rp 79.499** | ~~Rp 99.735~~ | `NA18240107890` | Salmon PDRN DNA, Alpha Arbutin, Physical UV Shield | 30 g |
| `numa-skin-oxydew-sunscreen-luceane-spf50-30ml` | **Numa Skin Oxydew Sunscreen Luceane SPF 50+ PA++++ 30ml** | *Tabir Surya Ringan Perlindungan Maksimal & Anti-Polusi Tanpa White Cast* | **Rp 79.000** | ~~Rp 123.750~~ | `NA18241700684` | Photostable Hybrid UV Filters, Antioxidant Complex | 30 ml |
| `numa-skin-nad-booster-anti-aging-serum-20ml` | **Numa Skin NAD+ Booster Anti-Aging Serum 20ml** | *Serum Konsentrat Rejuvenasi Seluler untuk Kulit Kencang & Cerah Merata* | **Rp 108.999** | ~~Rp 171.250~~ | `NA18242000231` | 2% Pure NAD+, 4% Niacinamide, 4X Peptide Complex, 4D Hyaluronic Acid | 20 ml |

---

### 1.2 42 Bundling & Regimen Catalog Breakdown

| Regimen Tier | Count | Featured Bundles | Price Range | Target Objective |
|:---|:---:|:---|:---|:---|
| **Full Routine Sets** | 5 | • Paket Lengkap 6-in-1 Routine (`Rp 524.500`)<br>• Paket Ultimate Anti-Aging 150ml (`Rp 485.500`)<br>• Paket Ultimate Anti-Aging 50ml (`Rp 455.500`)<br>• Paket Complete Routine 4-in-1 150ml (`Rp 406.000`)<br>• Paket Complete Routine 4-in-1 50ml (`Rp 376.000`) | Rp 376.000 – Rp 524.500 | Maximize initial purchase AOV; complete full regimen adoption. |
| **Targeted Trios** | 6 | • Paket Anti-Aging Trio (`Rp 297.000`)<br>• Paket Age Repair Trio 150ml (`Rp 267.500`)<br>• Paket Age Defense Trio (`Rp 297.500`)<br>• Paket Rejuvenating Trio 150ml (`Rp 297.000`)<br>• Paket Rejuvenating Trio 50ml (`Rp 267.000`)<br>• Paket Triple Protection 3-in-1 (`Rp 257.000`) | Rp 257.000 – Rp 297.500 | Mid-tier conversion; targeted solutions for anti-aging and barrier repair. |
| **Glow & Daily Trios** | 2 | • Paket Glow Up Adenosine (`Rp 227.000`)<br>• Paket Glow Up Gloss Gel (`Rp 257.000`) | Rp 227.000 – Rp 257.000 | Routine sets for daily skin hydration and moisture barrier maintenance. |
| **Specialized Duos** | 17 | • Paket Youth Glow Duo (150ml & 50ml)<br>• Paket Clean & Glow Duo (`Rp 178.000`)<br>• Paket Fresh & Hydrate Duo (`Rp 148.000`)<br>• Paket Daily Protection Duo (`Rp 178.000`)<br>• Paket Daily Care Adenosine / Gloss Gel (`Rp 148.000` / `Rp 178.000`)<br>• Paket Skin Protection Duo (`Rp 218.000`)<br>• Paket Skin Recharge Duo (`Rp 218.000`)<br>• Paket Timeless Skin Set (`Rp 218.000`)<br>• Paket NAD+ Youth Boost Set (`Rp 188.000`)<br>• Paket Luminous Duo (`Rp 188.500`)<br>• Paket Protection Duo PDRN (`Rp 188.500`)<br>• Paket Hydra Glow / Moist Glow Duo | Rp 148.000 – Rp 218.000 | Accessible multi-product upgrades; entry-level bundling. |
| **Essential Value Duos** | 12 | • Paket Sunscreen & Gloss Gel (`Rp 79.000`)<br>• Paket Sunscreen & Toner (`Rp 79.000`)<br>• Paket Adenosine & Sunscreen (`Rp 79.000`)<br>• Paket Twin Pack Toner 2x150ml (`Rp 79.000`)<br>• Paket Duo Toner 150ml + 50ml (`Rp 79.000`)<br>• Paket Exclusive Lotion & Gloss Gel (`Rp 301.650`) | Rp 79.000 – Rp 301.650 | High-velocity impulse purchases; trial sets and replenishments. |

---

## 2. Technical Architecture & Hydrogen Stack

```
numaskin.id (Edge Architecture)
├── Cloudflare Edge Global Network (Shopify Oxygen Workers)
│   ├── SSL Termination & HTTP/3
│   ├── Edge SSR & Streaming Loader Responses
│   └── Stale-While-Revalidate Global Caching
│
├── Hydrogen Application Engine (React Router v7 Framework Mode)
│   ├── app/root.tsx (Global HTML Shell, Context, Cart Provider)
│   ├── app/routes/
│   │   ├── _index.tsx (High-Converting Brand & Routine Homepage)
│   │   ├── products.$handle.tsx (PDP with Zoom, Variants, Sticky CTA)
│   │   ├── collections.$handle.tsx (PLP with 4-Col Grid Pagination)
│   │   ├── collections._index.tsx (Collection Directory)
│   │   ├── cart.tsx (Cart Mutations & Drawer Handler)
│   │   ├── search.tsx (Predictive Search clamped to 1..10)
│   │   └── account/ (Customer Account API v2 PKCE Auth)
│   └── app/components/ (Zero-AI-Slop Component Suite)
│
└── Commerce Authority (Shopify Core)
    ├── Storefront API (GraphQL Endpoint `2025-01` / `2026-04`)
    ├── Customer Account API v2
    └── Secure Checkout Flow with Session Linker
```

---

## 3. Technical Invariants & Implementation Guardrails

### 3.1 React Router v7 Framework Mode & Single Fetch
In React Router v7 framework mode, route loaders return plain data objects directly. They must **not** wrap output in `Response.json(...)`:
```typescript
// ✅ CORRECT (Framework Mode Single Fetch)
export async function loader({ context, params }: Route.LoaderArgs) {
  const { storefront } = context;
  const product = await storefront.query(PRODUCT_QUERY, {
    variables: { handle: params.handle },
    cache: storefront.CacheShort(),
  });
  if (!product) throw new Response('Not Found', { status: 404 });
  return { product };
}

// ❌ INCORRECT (Breaks Single Fetch Serialization)
export async function loader() {
  return Response.json({ product });
}
```

### 3.2 Predictive Search Clamp (`1..10`)
The Storefront API `predictiveSearch` query crashes if the `limit` parameter exceeds 10:
```typescript
// ✅ STRICT CLAMPING INVARIANT
const validatedLimit = Math.min(10, Math.max(1, requestedLimit || 6));
```

### 3.3 Grid-Proportional Pagination
Dynamic collections must query products in exact multiples of desktop column layout (4 columns) to prevent orphaned cards:
```typescript
// Desktop: 4 cols -> query in multiples of 4 (e.g. 12 items = 4x3)
const PAGE_SIZE = 12;
```

### 3.4 PDP Variant Purity & Indonesian Currency Formatting
Synthetic Shopify variants (`Title: Default Title`) must be suppressed from buyer-facing controls. Prices must be formatted cleanly without decimal `,00`:
```typescript
export function formatRupiah(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return 'Rp 0';
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}
```

### 3.5 Cross-Domain Checkout Linker
The checkout linker preserves advertising attribution parameters across domains:
```javascript
// Append Google Analytics & Meta Pixel tracking parameters to checkout URL
export function createCheckoutUrl(checkoutUrl, searchParams) {
  const url = new URL(checkoutUrl);
  ['_ga', '_gl', '_fbp', '_fbc'].forEach((param) => {
    const val = searchParams.get(param);
    if (val) url.searchParams.set(param, val);
  });
  return url.toString();
}
```

---

## 4. GraphQL Queries & Fragments

### 4.1 Product Core Fragment
```graphql
fragment ProductCore on Product {
  id
  title
  handle
  description
  descriptionHtml
  productType
  tags
  vendor
  availableForSale
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
    maxVariantPrice {
      amount
      currencyCode
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  featuredImage {
    url
    altText
    width
    height
  }
  images(first: 10) {
    nodes {
      url
      altText
      width
      height
    }
  }
  variants(first: 20) {
    nodes {
      id
      title
      availableForSale
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      selectedOptions {
        name
        value
      }
    }
  }
}
```

### 4.2 Cart Core Fragment
```graphql
fragment CartCore on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 50) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          product {
            title
            handle
          }
          image {
            url
            altText
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
```
