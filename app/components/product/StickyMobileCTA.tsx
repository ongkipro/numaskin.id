import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface StickyMobileCTAProps {
  product: Product;
  selectedPrice?: number;
  onAddToCart: () => void;
  targetId?: string;
}

export function StickyMobileCTA({
  product,
  selectedPrice,
  onAddToCart,
  targetId = 'main-purchase-actions',
}: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const price = selectedPrice || parseFloat(product.priceRange.minVariantPrice.amount);
  const image = product.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkVisibility = () => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      // Only show sticky bar after user has scrolled PAST the main purchase button
      const isPastButton = rect.bottom < 0;
      setIsVisible(isPastButton);
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    // Initial check
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [targetId]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="bg-white/92 backdrop-blur-2xl border-t border-white/90 shadow-[0_-10px_35px_rgba(0,43,73,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] px-4 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          {/* Thumbnail & Product Details */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <img
              src={image}
              alt={product.title}
              className="w-11 h-11 object-cover rounded-xl border border-white/90 shadow-2xs flex-shrink-0 bg-white"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#002B49] truncate font-sans leading-tight">
                {product.title}
              </p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-mono text-xs font-bold text-[#0B6E7D]">
                  {formatRupiah(price)}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  · BPOM
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: Aquatic Glass Primary */}
          <button
            type="button"
            onClick={onAddToCart}
            className="btn-glass-primary !rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider flex items-center gap-1.5 whitespace-nowrap shadow-xs active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#38B6CD]" />
            <span>+ Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
}
