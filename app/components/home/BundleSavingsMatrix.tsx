import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface BundleSavingsMatrixProps {
  bundles?: Product[];
  onAddToCart?: (bundle: Product) => void;
}

interface ActiveBundleItem {
  id: string;
  heroActive: string;
  heroActiveSuffix: string;
  benefit: string;
  label: string;
  bannerGradient: string;
  handle: string;
  defaultTitle: string;
  defaultImage: string;
  defaultPrice: number;
  defaultCompareAt: number;
  defaultSavingsPercent: number;
  itemsIncluded: string;
  itemCount: string;
}

const ACTIVE_BUNDLES: ActiveBundleItem[] = [
  {
    id: 'deep-sea-minerals',
    heroActive: 'DEEP SEA',
    heroActiveSuffix: 'MINERAL BLEND',
    benefit: 'HYDRATE & REPAIR SKIN BARRIER',
    label: 'Deep Sea Minerals',
    bannerGradient: 'from-[#0B6E7D]/90 via-[#0E7A8A]/85 to-[#1E8A9A]/90',
    handle: 'paket-fresh-and-hydrate',
    defaultTitle: 'Paket Fresh & Hydrate Duo',
    defaultImage: '/images/bundles/fresh-and-hydrate-09-gallery.webp',
    defaultPrice: 178000,
    defaultCompareAt: 224000,
    defaultSavingsPercent: 21,
    itemsIncluded: 'Facial Wash Gel (100ml) + Treatment Lotion (50ml)',
    itemCount: '2 PRODUK',
  },
  {
    id: 'nad-longevity',
    heroActive: '2% NAD+',
    heroActiveSuffix: 'BOOSTER COMPLEX',
    benefit: 'CELLULAR LONGEVITY & ANTI-AGING',
    label: '2% NAD+ Booster',
    bannerGradient: 'from-[#002B49]/95 via-[#063352]/90 to-[#0E4466]/95',
    handle: 'paket-anti-aging-trio',
    defaultTitle: 'Paket Anti-Aging Trio',
    defaultImage: '/images/bundles/anti-aging-trio-09-gallery.webp',
    defaultPrice: 297000,
    defaultCompareAt: 475000,
    defaultSavingsPercent: 37,
    itemsIncluded: 'NAD+ Serum (20ml) + Adenosine Cream (30g) + Sunscreen SPF 50+',
    itemCount: '3 PRODUK',
  },
  {
    id: 'salmon-pdrn',
    heroActive: 'SALMON PDRN',
    heroActiveSuffix: '& ALPHA ARBUTIN',
    benefit: 'CELL REPAIR & TONE-UP RADIANCE',
    label: 'Salmon PDRN Complex',
    bannerGradient: 'from-[#881337]/90 via-[#9F1239]/85 to-[#BE123C]/90',
    handle: 'paket-protection-duo-pdrn',
    defaultTitle: 'Paket Protection Duo PDRN',
    defaultImage: '/images/bundles/protection-duo-pdrn-09-gallery.webp',
    defaultPrice: 188500,
    defaultCompareAt: 275000,
    defaultSavingsPercent: 31,
    itemsIncluded: 'PDRN Tone-Up Day Cream (30g) + Sunscreen SPF 50+ (30ml)',
    itemCount: '2 PRODUK',
  },
  {
    id: 'adenosine-squalane',
    heroActive: 'ADENOSINE',
    heroActiveSuffix: '& SQUALANE SHIELD',
    benefit: 'FIRMING ELASTICITY & REPAIR',
    label: 'Adenosine & Squalane',
    bannerGradient: 'from-[#003B5C]/90 via-[#0E5277]/85 to-[#166088]/90',
    handle: 'paket-daily-care-adenosine',
    defaultTitle: 'Paket Daily Care Adenosine',
    defaultImage: '/images/bundles/daily-care-adenosine-09-gallery.webp',
    defaultPrice: 148000,
    defaultCompareAt: 224000,
    defaultSavingsPercent: 34,
    itemsIncluded: 'Facial Wash Gel (100ml) + Adenosine Moisturizer (30g)',
    itemCount: '2 PRODUK',
  },
];

export function BundleSavingsMatrix({ bundles }: BundleSavingsMatrixProps) {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8FCFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered Clean Luxury Presentation) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 flex flex-col items-center">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0B6E7D] font-semibold mb-1">
            TARGETED BIOACTIVE BUNDLES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#002B49] tracking-tight uppercase font-normal">
            Paket Bahan Aktif
          </h2>

          {/* Luminous Aqua Glass Underline */}
          <div className="mt-3.5 mb-2.5 flex items-center justify-center gap-1.5">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#269BA8]/40" />
            <div className="h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#269BA8] via-[#38B6CD] to-[#269BA8] shadow-[0_0_12px_rgba(38,155,168,0.5)] border border-white/60 backdrop-blur-xs" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#269BA8]/40" />
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed">
            Formulasi sinergis terarah sesuai target spesifik kulit Anda.
          </p>
        </div>

        {/* 4-Card Active Bundles Grid (Frameless Frosted Glass, Center Aligned, Zero 3D Emboss) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {ACTIVE_BUNDLES.map((item) => {
            const matchedBundle = bundles?.find((b) => b.handle === item.handle);
            const title = matchedBundle?.title || item.defaultTitle;
            const imageUrl = item.defaultImage || matchedBundle?.featuredImage?.url;
            const price = matchedBundle?.priceRange?.minVariantPrice?.amount
              ? parseFloat(matchedBundle.priceRange.minVariantPrice.amount)
              : item.defaultPrice;
            const compareAt = matchedBundle?.compareAtPriceRange?.minVariantPrice?.amount
              ? parseFloat(matchedBundle.compareAtPriceRange.minVariantPrice.amount)
              : item.defaultCompareAt;
            const savingsPercent = compareAt && compareAt > price
              ? Math.round(((compareAt - price) / compareAt) * 100)
              : item.defaultSavingsPercent;

            return (
              <article
                key={item.id}
                className="group flex flex-col justify-start h-full bg-white/70 hover:bg-white/95 backdrop-blur-md rounded-2xl border border-white/80 hover:border-white shadow-none transition-all duration-300 overflow-hidden select-none"
              >
                <Link to={`/products/${item.handle}`} className="flex flex-col h-full">
                  {/* 01. Packshot Canvas Area (Edge-to-Edge Clean Canvas) */}
                  <div className="relative aspect-square w-full bg-[#F4F9FA] overflow-hidden block">
                    <img
                      src={imageUrl}
                      alt={title}
                      decoding="async"
                      className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                    />

                    {/* Subtle Liquid Aqua Sheen on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#002B49]/8 via-transparent to-[#38B6CD]/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* 02. The Hero Active Ingredient Banner (Uniform Fixed Height Across All Cards, Zero 3D Borders) */}
                  <div className={`h-[56px] sm:h-[50px] px-2.5 sm:px-3.5 bg-gradient-to-r ${item.bannerGradient} backdrop-blur-md text-white flex flex-col justify-center items-center relative border-0 shadow-none overflow-hidden`}>
                    <div className="relative z-10 text-center w-full">
                      <div className="flex items-baseline justify-center gap-1 sm:gap-1.5 flex-wrap">
                        <span className="font-sans font-extrabold text-xs sm:text-sm md:text-[14px] leading-tight tracking-tight">
                          {item.heroActive}
                        </span>
                        <span className="font-sans font-semibold text-[8.5px] sm:text-[9.5px] md:text-[10.5px] leading-tight opacity-90 tracking-wide">
                          {item.heroActiveSuffix}
                        </span>
                      </div>
                      <span className="font-mono text-[7px] sm:text-[8px] md:text-[8.5px] uppercase tracking-wider opacity-85 mt-0.5 block truncate font-medium">
                        {item.benefit}
                      </span>
                    </div>
                  </div>

                  {/* 03. Under Card: Bundle Details (Presisi, Center Alignment, Clean Typography) */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-transparent text-center">
                    <div>
                      {/* Active Formula Label */}
                      <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] font-semibold text-[#0B6E7D] block mb-1">
                        {item.label}
                      </span>

                      {/* Product Bundle Title */}
                      <div className="h-5 sm:h-6 flex items-center justify-center mb-1 w-full">
                        <h3 className="uppercase font-semibold text-xs sm:text-[13px] text-[#002B49] leading-tight tracking-[0.05em] line-clamp-1 group-hover:text-[#269BA8] transition-colors">
                          {title}
                        </h3>
                      </div>

                      {/* Included Items Micro Description */}
                      <div className="h-7 sm:h-5 flex items-center justify-center mb-2.5 w-full">
                        <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-2 sm:line-clamp-1 font-normal leading-relaxed">
                          {item.itemsIncluded}
                        </p>
                      </div>

                      {/* Price & Savings Pill */}
                      <div className="h-9 sm:h-7 flex items-center justify-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                        <span className="font-semibold text-xs sm:text-sm text-[#002B49] font-sans tracking-tight">
                          {formatRupiah(price)}
                        </span>
                        {compareAt && compareAt > price && (
                          <span className="text-[10px] sm:text-[11px] text-slate-400 line-through font-mono">
                            {formatRupiah(compareAt)}
                          </span>
                        )}
                        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#EBF5F8] text-[#0B6E7D] font-semibold">
                          Hemat {savingsPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Subtle Formula Exploration Link */}
                    <div className="pt-2 mt-auto border-t border-slate-200/50 flex items-center justify-center gap-1 text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-[#0B6E7D] group-hover:text-[#002B49] transition-colors">
                      <span>Eksplorasi Formula</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#269BA8]" />
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

