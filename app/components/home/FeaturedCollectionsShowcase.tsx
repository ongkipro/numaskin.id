import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '~/components/product/ProductCard';
import type { Product } from '~/lib/mock-catalog';

export interface CollectionTab {
  id: string;
  title: string;
  handle: string;
  products: Product[];
}

interface FeaturedCollectionsShowcaseProps {
  tabs: CollectionTab[];
  onAddToCart?: (product: Product) => void;
}

export function FeaturedCollectionsShowcase({ tabs, onAddToCart }: FeaturedCollectionsShowcaseProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const activeTab = tabs[activeTabIdx] || tabs[0];
  const displayedProducts = activeTab?.products.slice(0, 8) || [];

  return (
    <section className="w-full py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              Pilihan Produk
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl">
              Perawatan kulit harian yang dirancang sesuai kebutuhan kulit Anda.
            </p>
          </div>

          <Link
            to={activeTab?.handle === 'all' ? '/collections/all' : `/collections/${activeTab?.handle}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002B49] hover:text-[#0B6E7D] transition-colors"
          >
            <span>Lihat Koleksi {activeTab?.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Flat Minimalist Collection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab, idx) => {
            const isActive = activeTabIdx === idx;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabIdx(idx)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#002B49] text-white'
                    : 'bg-[#F4F9FA] text-slate-600 hover:text-[#002B49] hover:bg-[#EBF5F8]'
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Borderless Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
