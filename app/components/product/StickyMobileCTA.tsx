import { ShoppingBag } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface StickyMobileCTAProps {
  product: Product;
  selectedPrice?: number;
  onAddToCart: () => void;
}

export function StickyMobileCTA({ product, selectedPrice, onAddToCart }: StickyMobileCTAProps) {
  const price = selectedPrice || parseFloat(product.priceRange.minVariantPrice.amount);
  const image = product.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/85 backdrop-blur-xl border-t border-white/70 px-4 py-2.5 shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        {/* Thumbnail & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={image}
            alt={product.title}
            className="w-10 h-10 object-cover rounded-xs border border-white/80 flex-shrink-0 shadow-2xs"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate leading-tight">
              {product.title}
            </p>
            <p className="text-xs font-bold text-[#002B49] font-sans">
              {formatRupiah(price)}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onAddToCart}
          className="rounded-full px-5 py-2.5 bg-gradient-to-r from-[#002B49] via-[#063352] to-[#002B49] text-white font-semibold text-xs tracking-wider flex items-center gap-1.5 whitespace-nowrap shadow-none active:scale-[0.98] transition-all"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#38B6CD]" />
          <span>+ Keranjang</span>
        </button>
      </div>
    </div>
  );
}
