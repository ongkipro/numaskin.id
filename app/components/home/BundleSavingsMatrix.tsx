import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
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
  accentBorder: string;
  badgeBg: string;
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
    bannerGradient: 'bg-gradient-to-r from-[#0B6E7D] via-[#127F90] to-[#269BA8]',
    accentBorder: 'hover:border-[#269BA8]/50',
    badgeBg: 'bg-[#EBF5F8] text-[#0B6E7D]',
    handle: 'numa-skin-paket-fresh-and-hydrate',
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
    bannerGradient: 'bg-gradient-to-r from-[#002B49] via-[#0E3D60] to-[#1E40AF]',
    accentBorder: 'hover:border-[#002B49]/50',
    badgeBg: 'bg-[#E8EFF5] text-[#002B49]',
    handle: 'numa-skin-paket-anti-aging-trio',
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
    bannerGradient: 'bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#E11D48]',
    accentBorder: 'hover:border-[#E11D48]/50',
    badgeBg: 'bg-[#FDF2F4] text-[#BE123C]',
    handle: 'numa-skin-paket-protection-duo-pdrn',
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
    bannerGradient: 'bg-gradient-to-r from-[#003B5C] via-[#0E5277] to-[#1B729E]',
    accentBorder: 'hover:border-[#0E5277]/50',
    badgeBg: 'bg-[#EBF5F8] text-[#002B49]',
    handle: 'numa-skin-paket-daily-care-adenosine',
    defaultTitle: 'Paket Daily Care Adenosine',
    defaultImage: '/images/bundles/daily-care-adenosine-09-gallery.webp',
    defaultPrice: 148000,
    defaultCompareAt: 224000,
    defaultSavingsPercent: 34,
    itemsIncluded: 'Facial Wash Gel (100ml) + Adenosine Moisturizer (30g)',
    itemCount: '2 PRODUK',
  },
];

export function BundleSavingsMatrix({ bundles, onAddToCart }: BundleSavingsMatrixProps) {
  return (
    <section className="w-full py-16 sm:py-24 bg-white">
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

        {/* 4-Card Active Bundles Grid (Presisi Atas, Rounded Tipis, Pure Image Fill) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
          {ACTIVE_BUNDLES.map((item) => {
            const matchedBundle = bundles?.find((b) => b.handle === item.handle);
            const title = matchedBundle?.title || item.defaultTitle;
            const imageUrl = item.defaultImage || matchedBundle?.featuredImage?.url;

            return (
              <article
                key={item.id}
                className={`group flex flex-col justify-start h-full bg-white rounded-sm border border-slate-200/80 ${item.accentBorder} shadow-[0_4px_16px_rgba(0,43,73,0.04)] hover:shadow-[0_16px_36px_-10px_rgba(0,43,73,0.12)] transition-all duration-300 overflow-hidden select-none`}
              >
                <Link to={`/products/${item.handle}`} className="flex flex-col h-full">
                  {/* 01. Packshot Canvas Area (Pure Edge-to-Edge Image Fill, Frameless, No Badges) */}
                  <div className="relative aspect-square w-full bg-[#F4F9FA] overflow-hidden block">
                    {/* Packshot Image with Edge-to-Edge Fill */}
                    <img
                      src={imageUrl}
                      alt={title}
                      decoding="async"
                      className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                    />

                    {/* Subtle Liquid Aqua Sheen on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#002B49]/8 via-transparent to-[#38B6CD]/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* 02. The Hero Active Ingredient Banner (Luminous Aqua Glass Ribbon) */}
                  <div className={`px-2.5 py-2 sm:px-3 sm:py-2.5 ${item.bannerGradient} text-white flex flex-col justify-center relative overflow-hidden border-y border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]`}>
                    {/* Liquid Caustics Light Refraction */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-white/15 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
                        <span className="font-sans font-black text-xs sm:text-sm md:text-base leading-none tracking-tight">
                          {item.heroActive}
                        </span>
                        <span className="font-sans font-bold text-[8.5px] sm:text-[10px] md:text-[11px] leading-none opacity-95 tracking-wide">
                          {item.heroActiveSuffix}
                        </span>
                      </div>
                      <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider opacity-90 mt-0.5 sm:mt-1 block truncate font-medium">
                        {item.benefit}
                      </span>
                    </div>
                  </div>

                  {/* 03. Under Card: Bundle Details (Presisi Atas, Clean & Focused) */}
                  <div className="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between bg-white text-center">
                    <div>
                      {/* Active Label */}
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold text-[#0B6E7D] block mb-0.5 sm:mb-1">
                        {item.label}
                      </span>

                      {/* Product Bundle Title */}
                      <h3 className="uppercase font-normal text-xs sm:text-[13px] text-[#002B49] leading-tight tracking-[0.05em] line-clamp-1 group-hover:text-[#269BA8] transition-colors mb-1">
                        {title}
                      </h3>

                      {/* Included Items Micro Description */}
                      <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 line-clamp-2 sm:line-clamp-1 font-normal leading-relaxed">
                        {item.itemsIncluded}
                      </p>
                    </div>

                    {/* Subtle Formula Exploration Link */}
                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider text-[#0B6E7D] group-hover:text-[#002B49] transition-colors">
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

