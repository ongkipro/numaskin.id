import { Link } from 'react-router';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface BundleSavingsMatrixProps {
  bundles: Product[];
  onAddToCart?: (bundle: Product) => void;
}

export function BundleSavingsMatrix({ bundles, onAddToCart }: BundleSavingsMatrixProps) {
  // Pick 4 standout bundles across tiers
  const featuredBundles = bundles.slice(0, 4);

  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8FCFD] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              Paket Hemat
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Paket perawatan lengkap dengan harga lebih hemat.
            </p>
          </div>

          <Link
            to="/collections/paket-hemat-bundling"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002B49] hover:text-[#0B6E7D] transition-colors"
          >
            <span>Lihat Semua Paket</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Featured Bundles Grid (Flat Minimalist) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredBundles.map((b) => {
            const price = parseFloat(b.priceRange.minVariantPrice.amount);
            const compareAt = b.compareAtPriceRange?.minVariantPrice.amount
              ? parseFloat(b.compareAtPriceRange.minVariantPrice.amount)
              : null;
            const savings = compareAt ? compareAt - price : 0;
            const imageUrl = b.featuredImage?.url || '/images/banners/04-category-banner-kategori-paket-awet-muda-banner.jpg';

            return (
              <div
                key={b.id}
                className="p-4 sm:p-5 rounded-xl bg-white border border-slate-100/90 hover:border-[#38B6CD]/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#002B49] text-white font-mono text-[10px] font-medium px-2 py-0.5 rounded-full">
                      PAKET HEMAT
                    </span>
                    {savings > 0 && (
                      <span className="font-mono text-[11px] text-[#0B6E7D] font-bold">
                        HEMAT {formatRupiah(savings)}
                      </span>
                    )}
                  </div>

                  {/* Image (Frameless, Clean) */}
                  <Link
                    to={`/products/${b.handle}`}
                    className="block aspect-square w-full overflow-hidden rounded-sm mb-3.5"
                  >
                    <img
                      src={imageUrl}
                      alt={b.title}
                      loading="lazy"
                      className="w-full h-full object-contain rounded-sm p-1 group-hover:scale-103 transition-transform duration-300"
                    />
                  </Link>

                  <h3 className="font-medium text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 mb-1">
                    <Link to={`/products/${b.handle}`} className="hover:text-[#002B49]">
                      {b.title}
                    </Link>
                  </h3>

                  {b.subtitle && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {b.subtitle}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-bold text-base text-[#002B49] font-sans">
                      {formatRupiah(price)}
                    </span>
                    {compareAt && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatRupiah(compareAt)}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/products/${b.handle}`}
                    className="w-full py-2.5 rounded-full bg-[#002B49] hover:bg-[#034266] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Lihat Paket</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
