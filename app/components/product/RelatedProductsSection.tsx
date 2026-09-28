import { ProductCard } from '~/components/product/ProductCard';
import type { Product } from '~/lib/mock-catalog';

interface RelatedProductsSectionProps {
  products: Product[];
}

export function RelatedProductsSection({ products }: RelatedProductsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-16 sm:py-24 bg-transparent mt-16 sm:mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered Clean Luxury Presentation matching Homepage) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 flex flex-col items-center">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0B6E7D] font-semibold mb-1">
            RANGKAIAN SINERGIS PELENGKAP
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#002B49] tracking-tight uppercase font-normal">
            Rekomendasi Terkait
          </h2>

          {/* Luminous Aqua Glass Underline */}
          <div className="mt-3.5 mb-3 flex items-center justify-center gap-1.5">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#269BA8]/40" />
            <div className="h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#269BA8] via-[#38B6CD] to-[#269BA8] shadow-[0_0_12px_rgba(38,155,168,0.5)] border border-white/60 backdrop-blur-xs" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#269BA8]/40" />
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed font-sans">
            Formulasi sinergis untuk menyempurnakan efektivitas ritual perawatan kulit harian Anda.
          </p>
        </div>

        {/* 4-Product Grid (Exact Homepage Pattern: Direct ProductCard, Zero Custom Re-inventions) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2.5 sm:gap-x-3.5 lg:gap-x-4 gap-y-6 sm:gap-y-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
