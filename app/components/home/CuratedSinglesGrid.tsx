import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '~/components/product/ProductCard';
import type { Product } from '~/lib/mock-catalog';

interface CuratedSinglesGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function CuratedSinglesGrid({ products, onAddToCart }: CuratedSinglesGridProps) {
  return (
    <section className="w-full py-16 sm:py-24 bg-ocean-ambient border-t border-b border-[#E2EDF0] relative overflow-hidden">
      {/* Ambient Sea Blur */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#38B6CD]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-xs aqua-glass-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-[#002B49]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#002B49] font-semibold">
                8 CORE ESSENTIALS
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              Formula Unggulan Numa Skin
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Dari pembersih gel mineral hingga konsentrat serum DNA seluler, terdaftar resmi BPOM RI.
            </p>
          </div>

          <Link
            to="/collections/all"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002B49] hover:text-[#269BA8] transition-colors"
          >
            <span>Lihat Semua Katalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Col Desktop / 2-Col Mobile Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((product) => (
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
