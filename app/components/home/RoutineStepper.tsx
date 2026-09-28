import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface RoutineStepperProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onAddBundle?: (handle: string) => void;
}

const STEPS = [
  {
    step: '01',
    phase: 'BERSIHKAN',
    handle: 'numa-skin-deep-sea-water-facial-wash-100ml',
    activeHighlight: '5% Niacinamide & Sea Water',
    price: 68999,
  },
  {
    step: '02',
    phase: 'HIDRASI',
    handle: 'numa-skin-deep-sea-water-treatment-lotion',
    activeHighlight: 'Ulleung Deep Sea Water',
    price: 79000,
  },
  {
    step: '03',
    phase: 'NUTRISI',
    handle: 'numa-skin-nad-booster-anti-aging-serum-20ml',
    activeHighlight: '2% NAD+ & 4X Peptide',
    price: 108999,
  },
  {
    step: '04',
    phase: 'KUNCI',
    handle: 'numa-skin-adenosine-deep-sea-water-moisturizer-30g',
    activeHighlight: 'Adenosine & Phytosqualane',
    price: 78999,
  },
];

export function RoutineStepper({ products }: RoutineStepperProps) {
  return (
    <section className="w-full py-14 sm:py-20 relative overflow-hidden bg-[#FAFCFD]">
      {/* Ambient Deep Sea Water Ripple Background Video (Responsive Desktop & Mobile) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Desktop Video (16:9 Landscape) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/videos/numa-skin-deep-sea-water-ritual-desktop-poster.webp"
          className="hidden sm:block absolute inset-0 w-full h-full object-cover object-center opacity-85"
        >
          <source
            src="/videos/numa-skin-deep-sea-water-ritual-desktop.webm"
            type="video/webm"
          />
          <source
            src="/videos/numa-skin-deep-sea-water-ritual-desktop.mp4"
            type="video/mp4"
          />
        </video>

        {/* Mobile Video (9:16 Portrait) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/videos/numa-skin-deep-sea-water-ritual-mobile-poster.webp"
          className="block sm:hidden absolute inset-0 w-full h-full object-cover object-center opacity-85"
        >
          <source
            src="/videos/numa-skin-deep-sea-water-ritual-mobile.webm"
            type="video/webm"
          />
          <source
            src="/videos/numa-skin-deep-sea-water-ritual-mobile.mp4"
            type="video/mp4"
          />
        </video>

        {/* Seamless Blending Veils: Top blends with white, bottom blends with #F8FCFD */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-[#F8FCFD] pointer-events-none opacity-50" />
        <div className="absolute inset-0 bg-radial from-transparent via-white/5 to-white/30 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 flex flex-col items-center">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0B6E7D] font-semibold mb-1">
            THE 4-STEP RITUAL
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#002B49] tracking-tight uppercase font-normal">
            Rangkaian Sinergis Awet Muda
          </h2>

          {/* Luminous Aqua Glass Underline */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#269BA8]/40" />
            <div className="h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#269BA8] via-[#38B6CD] to-[#269BA8] border border-white/60" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#269BA8]/40" />
          </div>
        </div>

        {/* 4 Steps Grid: Pure Semi-Transparent Glass Cards (No Shadows, Max Water Visibility) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {STEPS.map((s, idx) => {
            const matchedProduct = products.find((p) => p.handle === s.handle) || products[idx];
            const imageUrl = matchedProduct?.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';
            const price = matchedProduct ? parseFloat(matchedProduct.priceRange.minVariantPrice.amount) : s.price;

            return (
              <article
                key={s.step}
                className="group flex flex-col justify-between h-full bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 hover:border-white/90 hover:-translate-y-1 transition-all duration-500 overflow-hidden select-none"
              >
                <Link to={`/products/${s.handle}`} className="flex flex-col h-full p-2.5 sm:p-3.5">
                  {/* Packshot Image Fill with Semi-Transparent Floating Step Pill */}
                  <div className="relative aspect-square w-full rounded-xl bg-white/20 overflow-hidden flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={matchedProduct?.title || s.handle}
                      loading="lazy"
                      className="w-full h-full object-contain mix-blend-multiply transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                    />
                    
                    {/* Subtle Liquid Aqua Sheen on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#002B49]/5 via-transparent to-[#38B6CD]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Semi-Transparent Glass Step Pill (No Shadow) */}
                    <span className="absolute top-2.5 left-2.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-xs text-[#002B49] border border-white/80 z-10">
                      STEP {s.step} · {s.phase}
                    </span>
                  </div>

                  {/* Clean Minimal Typography with High Contrast & Soft Frosted Underlay */}
                  <div className="pt-3 flex flex-col flex-1 justify-between text-center">
                    <div>
                      {/* Active Formula Tag */}
                      <div className="h-4 flex items-center justify-center mb-0.5">
                        <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#0B6E7D] font-semibold block truncate max-w-full">
                          {s.activeHighlight}
                        </span>
                      </div>

                      {/* Product Title */}
                      <div className="h-8 sm:h-9 flex items-center justify-center mb-1.5 w-full">
                        <h3 className="uppercase font-medium text-xs sm:text-[13px] text-[#002B49] leading-[1.25] tracking-[0.04em] line-clamp-2 text-center group-hover:text-[#269BA8] transition-colors">
                          {matchedProduct?.title || s.handle}
                        </h3>
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-2.5 mt-2 border-t border-white/50 flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-[#002B49] font-sans tracking-tight">
                        {formatRupiah(price)}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#0B6E7D] group-hover:text-[#002B49] flex items-center gap-0.5 font-medium transition-colors">
                        <span>Detail</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#269BA8]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Semi-Transparent Fluid Glass 4-in-1 Ritual Deal Capsule (No Shadow) */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-2xl bg-white/50 hover:bg-white/65 backdrop-blur-lg border border-white/70 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-4 transition-all duration-300">
          {/* Subtle Ambient Water Sheen */}
          <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent pointer-events-none" />

          {/* Left Column: Ritual Details & Step Flow Chips */}
          <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-auto">
            {/* Discount & Savings Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#002B49] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38B6CD] animate-pulse" />
              <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-semibold">
                HEMAT 23% · HEMAT RP 122.750
              </span>
            </div>

            {/* Set Title */}
            <h3 className="font-serif text-sm sm:text-base text-[#002B49] tracking-tight uppercase font-medium mt-1.5">
              Paket Lengkap Rutinitas Awet Muda (4-in-1)
            </h3>

            {/* Connected Ritual Flow Chips */}
            <div className="flex items-center justify-center lg:justify-start flex-wrap gap-1 sm:gap-1.5 mt-2">
              <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#002B49] bg-white/70 border border-white/80 px-2.5 py-0.5 rounded-full">
                01 Facial Wash
              </span>
              <span className="text-[#269BA8] text-[10px] select-none">→</span>
              <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#002B49] bg-white/70 border border-white/80 px-2.5 py-0.5 rounded-full">
                02 Treatment Lotion
              </span>
              <span className="text-[#269BA8] text-[10px] select-none">→</span>
              <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#002B49] bg-white/70 border border-white/80 px-2.5 py-0.5 rounded-full">
                03 NAD+ Serum
              </span>
              <span className="text-[#269BA8] text-[10px] select-none">→</span>
              <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#002B49] bg-white/70 border border-white/80 px-2.5 py-0.5 rounded-full">
                04 Moisturizer
              </span>
            </div>
          </div>

          {/* Right Column: High-Contrast Accessible Price & Action */}
          <div className="relative z-10 flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4 pt-3 lg:pt-0 border-t border-slate-200/50 lg:border-0 shrink-0">
            <div className="text-left lg:text-right">
              <span className="text-[11px] text-slate-500 line-through font-mono block leading-none mb-1">
                Rp 528.750
              </span>
              <div className="flex items-baseline gap-1 lg:justify-end">
                <span className="text-base sm:text-xl font-bold text-[#002B49] font-sans tracking-tight">
                  Rp 406.000
                </span>
                <span className="text-[9.5px] font-mono text-[#0B6E7D] uppercase tracking-wider font-semibold">
                  / Set
                </span>
              </div>
            </div>

            <Link
              to="/products/numa-skin-paket-complete-routine-4-in-1-150ml"
              className="btn-glass-cyan px-4 py-2.5 sm:px-5 sm:py-3 text-[10px] sm:text-[11px] font-mono group shrink-0"
            >
              <span>Beli Paket 4-in-1</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-white/90" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
