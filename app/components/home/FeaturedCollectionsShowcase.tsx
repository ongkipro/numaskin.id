import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '~/components/product/ProductCard';
import type { Product } from '~/lib/mock-catalog';

interface FeaturedCollectionsShowcaseProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function FeaturedCollectionsShowcase({ products, onAddToCart }: FeaturedCollectionsShowcaseProps) {
  return (
    <section className="w-full pt-8 sm:pt-12 pb-16 sm:pb-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Minimalist Luxury Presentation with Aqua Glass Underline) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 flex flex-col items-center">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#002B49] tracking-tight uppercase font-normal">
            Koleksi Unggulan
          </h2>

          {/* Luminous Aqua Glass Underline */}
          <div className="mt-3.5 mb-3 flex items-center justify-center gap-1.5">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#269BA8]/40" />
            <div className="h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#269BA8] via-[#38B6CD] to-[#269BA8] shadow-[0_0_12px_rgba(38,155,168,0.5)] border border-white/60 backdrop-blur-xs" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#269BA8]/40" />
          </div>

          <Link
            to="/collections/all"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#0B6E7D] hover:text-[#002B49] transition-colors group"
          >
            <span>Lihat Semua Produk</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#269BA8]" />
          </Link>
        </div>

        {/* Unified 8-Product Standard Collection Grid (Precise & Harmonious) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 sm:gap-x-3 lg:gap-x-3.5 gap-y-6 sm:gap-y-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
