import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '~/components/product/ProductCard';
import type { Product } from '~/lib/mock-catalog';

interface FeaturedCollectionsShowcaseProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function FeaturedCollectionsShowcase({ products, onAddToCart }: FeaturedCollectionsShowcaseProps) {
  const displayedProducts = products.slice(0, 8);

  return (
    <section className="w-full py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Standard Clean Shopify Pattern) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#269BA8] font-semibold block mb-1.5">
              KOLEKSI UNGGULAN
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              Formula Utama Numa Skin
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl">
              Rangkaian esensial berbahan dasar Ulleung Island Deep Sea Water & 2% NAD+ Booster, terdaftar resmi BPOM RI.
            </p>
          </div>

          <Link
            to="/collections/all"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002B49] hover:text-[#269BA8] transition-colors shrink-0"
          >
            <span>Lihat Semua Produk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Col Desktop / 2-Col Mobile Shopify Product Grid (8 Core Products, No Tabs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedProducts.map((product) => (
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
