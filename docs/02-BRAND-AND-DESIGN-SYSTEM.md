# Numa Skin — Brand Guidelines & Design System Specification

> **Brand:** Numa Skin (ヌマスキン / Numa-Skin) · **Domain:** [numaskin.id](https://numaskin.id)
> **Design Philosophy:** J-Beauty Clinical Minimalism · Ocean Mineral Rejuvenation · Zero-AI-Slop Architecture
> **Target Framework:** Tailwind CSS v4 on Shopify Hydrogen (`@shopify/hydrogen@^2026.4.5`)

---

## 1. Brand Identity & Visual Language

### 1.1 Brand Essence
Numa Skin merges Japanese skincare philosophy (mindful ritual, non-stripping purity, skin barrier respect) with cutting-edge cellular marine biology. The visual identity reflects **purity, hydration, calmness, and clinical precision**.

### 1.2 Official Brand Marks
1. **The 'N' Botanical Crest:** A minimalist botanical crest combining a sprouting leaf and a cresting ocean wave into the letter **N**, representing renewal and deep sea life.
2. **The Latin Wordmark:** Clean, geometric, tracked-out sans serif: `N U M A • S K I N`.
3. **The Japanese Katakana Mark:** `ヌマスキン` (Numasukin), paying homage to Japanese skincare heritage and formulation rigor.
4. **Campaign Taglines:**
   - *"Muda untuk Masa Depan #TimelessDNA"*
   - *"#AwetMudaBersama"* (Brand Ambassador: Sahrul Gunawan & Dine Pearl)
   - *"Clinical Oceanic Skincare Infused with Ulleung Deep Sea Water"*

---

## 2. Color System & Design Tokens

The color palette is derived directly from the deep ocean minerals, sea foam mist, clear glass packaging, and luxury gold-foil wave accents.

### 2.1 Primary & Secondary Palette

| Token Name | Hex Code | RGB | HSL | Intent & Usage |
|:---|:---|:---|:---|:---|
| `--color-marine-deep` | `#132A5C` | `19, 42, 92` | `221, 66%, 22%` | **Primary Brand Color.** Primary CTAs, active navigation items, brand wordmark, dark luxury buttons. |
| `--color-marine-dark` | `#0D1D40` | `13, 29, 64` | `221, 66%, 15%` | Hover state for primary CTAs, high-contrast dark sections, footer background. |
| `--color-ocean-cyan` | `#269BA8` | `38, 155, 168` | `186, 63%, 40%` | **Secondary Brand Accent.** Hydration feature callouts, secondary buttons, active tab underlines, icons. |
| `--color-ocean-aqua` | `#38B6CD` | `56, 182, 205` | `189, 61%, 51%` | Bright accent, water droplet highlights, interactive hover states. |
| `--color-sea-mist` | `#EBF5F8` | `235, 245, 248` | `194, 45%, 95%` | **Surface Background Tint.** Alternating section backgrounds, card surfaces, routine step containers. |
| `--color-sea-foam` | `#F4F9FA` | `244, 249, 250` | `190, 33%, 97%` | Ultra-subtle page canvas tint, input fill backgrounds. |
| `--color-pure-white` | `#FFFFFF` | `255, 255, 255` | `0, 0%, 100%` | Pure card canvas, modal backgrounds, crisp contrast areas. |

### 2.2 Neutral & Functional Tokens

| Token Name | Hex Code | Usage |
|:---|:---|:---|
| `--color-text-primary` | `#0F172A` | Primary typography, headlines, product titles, prices (`slate-900`). |
| `--color-text-secondary` | `#5A6B82` | Secondary typography, subtitles, ingredient explanations, captions (`slate-600`). |
| `--color-text-muted` | `#94A3B8` | Strikethrough compare-at prices, disabled controls, meta kickers (`slate-400`). |
| `--color-border-hairline` | `#E2EDF0` | Subtle clean 1px borders, table dividers, accordion borders. |
| `--color-gold-accent` | `#C5A869` | Gold foil styling for NAD+ Booster and premium anti-aging series badges. |
| `--color-discount-coral` | `#E05368` | Percentage off pills (`HEMAT 36%`), flash sale countdown alerts. |
| `--color-badge-success` | `#10B981` | In-stock indicators, verified purchase badges, BPOM confirmation checkmarks. |

### 2.3 Tailwind CSS v4 Theme Configuration

```css
@theme {
  --color-brand-marine: #132A5C;
  --color-brand-marine-dark: #0D1D40;
  --color-brand-cyan: #269BA8;
  --color-brand-aqua: #38B6CD;
  --color-brand-mist: #EBF5F8;
  --color-brand-foam: #F4F9FA;
  --color-brand-gold: #C5A869;
  --color-brand-coral: #E05368;

  --font-serif: "DM Serif Display", Georgia, serif;
  --font-sans: "Inter", "Plus Jakarta Sans", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-none: 0px;
}
```

---

## 3. Typography Hierarchy

The typography marries classical editorial luxury (representing age-defying elegance) with modern digital clarity.

```
┌────────────────────────────────────────────────────────────────────────┐
│  DM Serif Display (400) · Editorial Dignity & Clinical Prestige        │
│  "Kerutan & Flek Hitam Hilang dalam 14 Hari?"                          │
├────────────────────────────────────────────────────────────────────────┤
│  Inter / Plus Jakarta Sans (400, 500, 600, 700) · Modern Clarity       │
│  "Numa Skin Deep Sea Water Treatment Lotion 150ml · Rp 79.000"         │
├────────────────────────────────────────────────────────────────────────┤
│  JetBrains Mono (500) · Scientific Authority & Precision Data          │
│  "2% NAD+ · ULLEUNG ISLAND DEEP SEA WATER · BPOM NA18220101675"        │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Type Scale Specification

| Element | Font Family | Weight | Size (Desktop / Mobile) | Line Height | Tracking |
|:---|:---|:---|:---|:---|:---|
| **Display H1** | `DM Serif Display` | 400 | `48px` / `32px` | `1.15` | `-0.02em` |
| **Headline H2** | `DM Serif Display` | 400 | `36px` / `26px` | `1.2` | `-0.01em` |
| **Subhead H3** | `Inter` | 600 | `22px` / `18px` | `1.3` | `0` |
| **Product Title** | `Inter` | 600 | `16px` / `14px` | `1.35` | `0` |
| **Price (Current)** | `Inter` | 700 | `18px` / `16px` | `1` | `-0.01em` |
| **Price (Compare-At)**| `Inter` | 400 | `14px` / `12px` | `1` | `0` (Strikethrough) |
| **Body (Default)** | `Inter` | 400 | `16px` / `14px` | `1.6` | `0` |
| **Body Small** | `Inter` | 400 | `14px` / `12px` | `1.5` | `0` |
| **Section Kicker** | `JetBrains Mono` | 500 | `11px` / `10px` | `1` | `+0.25em` (Uppercase) |
| **Button CTA** | `Inter` | 600 | `14px` / `14px` | `1` | `+0.05em` (Uppercase) |

---

## 4. Zero-AI-Slop & Editorial Purity Rules

To maintain high aesthetic taste and separate Numa Skin from low-quality drop-shipping themes, all UI components must strictly adhere to the following rules:

### ❌ STRICTLY FORBIDDEN (AI Slop Anti-Patterns)
1. **NO Sparkle / Magic Wand / Star Icons in Badges:** Decorative icons like `Sparkles`, `Stars`, or `Wand2` placed in rounded pills are banned. Category kickers and micro-tags must be pure typography:
   ```jsx
   /* ❌ SLOPPY AI CODE */
   <span className="flex items-center gap-1 bg-pink-100 text-pink-600 rounded-full px-3 py-1">
     <Sparkles className="w-3 h-3" /> Best Seller
   </span>

   /* ✅ NUMA SKIN CLEAN ARCHITECTURE */
   <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-marine">
     ● BEST SELLER · 01 ROUTINE ESSENTIAL
   </span>
   ```
2. **NO Bubbly Rounded Containers (`rounded-3xl`, `rounded-full` Cards):** Product cards, feature blocks, and modals must use clean architectural radii: `rounded-none`, `rounded-sm` (4px), or at most `rounded-md` (8px).
3. **NO Pastel Rainbow Gradients or Fuzzy Drop Shadows:** Avoid gratuitous multi-color linear gradients and heavy `shadow-2xl` blurs. Use pure crisp white `#FFFFFF`, subtle hairline borders `#E2EDF0`, or delicate sea-mist surface tints `#EBF5F8`.
4. **NO Invented Skeuomorphic Gimmicks:** No 3D pushpins, tilted cards, fake sticky tape, or mock progress circles claiming "98.7% Recovery Meter". All data displays must represent genuine facts (e.g. `14 Hari Uji Klinis`, `BPOM NA18241203644`).
5. **NO Emojis in Interface Labels:** Emojis (🎉, ✨, 🔥, 🧴) in product tags, headings, or buttons are prohibited. Use clear semantic Indonesian copywriting.

---

## 5. Component Library Specifications

### 5.1 Product Card (`<ProductCard />`)
- **Container:** Pure white canvas, borderless or wrapped in subtle 1px border `border-[#E2EDF0]`, `rounded-sm`. Zero heavy shadow (`shadow-none` or `hover:shadow-sm`).
- **Media Container:** Aspect ratio `1:1` or `4:5`. Clean photography with light blue / white ocean backdrop. Hover transitions smoothly to secondary angle or texture shot (`transition-all duration-300`).
- **Discount Badge:** Clean rectangular tag in top-left corner:
  - Background: `bg-brand-marine text-white font-mono text-[10px] tracking-wider px-2 py-0.5`.
- **BPOM Micro-Tag:** Top-right or bottom meta in `font-mono text-[10px] text-slate-400`.
- **Title Alignment:** Snug alignment without fixed height hacks. Uses `line-clamp-2` with natural font leading so single-line titles sit comfortably above prices.
- **Price Block:**
  - Current price in bold Navy (`text-brand-marine font-bold text-base`).
  - Strikethrough normal price in muted slate (`text-slate-400 line-through text-xs ml-2`).
- **Quick Add-to-Cart Trigger:** Clean borderless hover button or subtle bag icon that triggers optimistic addition to `<CartDrawer />`.

### 5.2 Routine 4-Step Stepper (`<RoutineStepper />`)
- **Stage Progression:**
  - `01 Cleanse` → `02 Tone & Hydrate` → `03 Treat & Nourish` → `04 Protect & Seal`
- **Card Design:**
  - Large ghost numeral watermark in card background (`01`, `02`, `03`, `04`) with opacity 15%.
  - Clean step pill: `STEP 01 · PEMBERSIIH PORI LEMBUT`.
  - Product thumbnail and key active ingredient callout (e.g. `5% Niacinamide`).
  - Direct "Beli Rangkaian Lengkap" CTA at the bottom with bundle savings banner.

### 5.3 Optimistic Cart Drawer (`<CartDrawer />`)
- **Overlay:** Frosted backdrop `bg-slate-900/40 backdrop-blur-sm`.
- **Drawer Body:** Pure white slide-out panel (`w-full max-w-md bg-white border-l border-slate-200`).
- **Free Shipping Threshold Bar:**
  - Dynamic progress calculation based on total subtotal vs. `Rp 200.000`.
  - Ocean-cyan progress track `bg-brand-cyan h-1.5 transition-all duration-300`.
  - Real-time notice: *"Tambah Rp 42.000 lagi untuk GRATIS ONGKIR!"* or *"🎉 Anda Mendapatkan Gratis Ongkir!"*.
- **Line Items:** Thumbnail, title, selected variant (e.g. `150ml`), clean numeric quantity incrementor (`-` / `+`), and clear price.
- **Quick Upsell Carousel:** 1-click add-on items (e.g. Travel Size 50ml Lotion for Rp 79.000).
- **Checkout CTA Button:** Full-width high-contrast Marine Navy button:
  - Text: `LANJUT KE PEMBAYARAN · RP 247.999`
  - Integrated with `checkout.js` cross-domain session preservation.

### 5.4 Sticky Mobile Add-to-Cart Bar (`<StickyMobileCTA />`)
- **Trigger:** Activates automatically on mobile devices (< 768px) when the primary PDP purchase button scrolls out of the viewport.
- **Layout:** Fixed bottom bar (`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-4`).
- **Left Column:** Product thumbnail (40x40px), product name (truncated), and bold current price.
- **Right Column:** High-converting CTA button `BELI SEKARANG` or `+ KERANJANG`.

---

## 6. Iconography & Media Guidelines

### 6.1 Functional Icon Library (Lucide React)
Only strictly functional, geometric line icons are permitted:
- Navigation: `Menu`, `X`, `ChevronDown`, `ChevronRight`, `ArrowRight`
- Commerce: `ShoppingBag`, `Search`, `User`, `Plus`, `Minus`, `Trash2`
- Trust & Verification: `ShieldCheck`, `Check`, `Droplets`, `Clock`, `Truck`
- Social & Communication: `MessageCircle` (WhatsApp), `Instagram`

### 6.2 Photography & Scrim Standards
- **Model Imagery:** Respect authentic Asian model photography featuring radiant, well-hydrated skin. Do not apply heavy filters that distort skin tone.
- **Directional Scrims for Readability:** When overlaying white text on banners, never reduce overall image opacity. Apply directional linear gradient scrims:
  ```css
  /* Left-to-right horizontal scrim for desktop hero */
  background: linear-gradient(to right, rgba(19, 42, 92, 0.85) 0%, rgba(19, 42, 92, 0.4) 60%, transparent 100%);
  ```
- **Product Assets:** Clean packshots centered with subtle reflections on clean white or soft marine mist `#EBF5F8`.
