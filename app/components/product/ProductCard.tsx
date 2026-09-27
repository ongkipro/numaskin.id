import { Link } from 'react-router';
import { ShoppingBag, Eye } from 'lucide-react';
import { formatRupiah, calculateDiscount } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const currentPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const discountPercent = compareAtPrice ? calculateDiscount(currentPrice, compareAtPrice) : 0;
  const imageUrl = product.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';

  return (
    <article className="group flex flex-col justify-between h-full bg-transparent">
      
      {/* 100% Frameless & Borderless Product Image with Ethereal Glass Hover */}
      <Link
        to={`/products/${product.handle}`}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 mb-3 block"
      >
        {/* Minimal Floating Discount Tag */}
        {discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 z-10 font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#002B49] text-white shadow-xs">
            -{discountPercent}%
          </span>
        )}

        {/* Primary Product Image (No Second Image Swap) */}
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
        />

        {/* Ethereal Aqua Glass Sheen Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/15 via-white/10 to-transparent backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />

        {/* Floating Aqua Glass Pill Action on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out hidden sm:flex items-center justify-center pointer-events-none">
          <span className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#002B49] flex items-center justify-center gap-1.5 aqua-glass-pill shadow-xs">
            <Eye className="w-3.5 h-3.5 text-[#269BA8]" />
            <span>Lihat Detail</span>
          </span>
        </div>
      </Link>

      {/* Product Information (Frameless, Clean Typography) */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category / Netto */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span className="uppercase text-[#0B6E7D] font-medium tracking-wider text-[10px]">
              {product.productType || 'SKINCARE'}
            </span>
            {product.netto && <span>{product.netto}</span>}
          </div>

          {/* Product Title */}
          <h3 className="font-normal sm:font-medium text-xs sm:text-sm text-slate-800 leading-snug line-clamp-2 group-hover:text-[#002B49] transition-colors min-h-[2.5rem] mb-2">
            <Link to={`/products/${product.handle}`}>
              {product.title}
            </Link>
          </h3>
        </div>

        {/* Price & Quick Action */}
        <div className="pt-1 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-semibold text-sm sm:text-base text-[#002B49] font-sans tracking-tight">
              {formatRupiah(currentPrice)}
            </span>
            {compareAtPrice && compareAtPrice > currentPrice && (
              <span className="text-[11px] text-slate-400 line-through font-mono">
                {formatRupiah(compareAtPrice)}
              </span>
            )}
          </div>

          {onAddToCart && (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100/80 hover:bg-[#002B49] text-slate-600 hover:text-white transition-colors flex items-center justify-center shrink-0"
              aria-label={`Tambah ${product.title} ke keranjang`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

    </article>
  );
}
