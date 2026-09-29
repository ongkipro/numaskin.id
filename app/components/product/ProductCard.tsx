import { Link } from 'react-router';
import { formatRupiah } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const currentPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const imageUrl = product.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';

  // Format clean mineral formula tag
  const formulaTag = product.netto
    ? `${product.productType || 'SKINCARE'} · ${product.netto}`
    : product.productType || 'SKINCARE';

  return (
    <article className="group flex flex-col justify-start bg-transparent text-center select-none w-full">
      
      {/* 1. Mineral Water Pool Canvas (Pure Edge-to-Edge Image Fill, Rounded Tipis, No Nested Frames) */}
      <Link
        to={`/products/${product.handle}`}
        className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#F4F9FA] mb-2 block transition-all duration-500 group-hover:shadow-[0_12px_28px_-6px_rgba(0,43,73,0.08)]"
      >
        {/* Primary Product Image (Clean Edge-to-Edge Fill with Floating Buoyancy Hover) */}
        <img
          src={imageUrl}
          alt={product.title}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
          decoding="async"
          width={400}
          height={400}
          className="w-full h-full object-cover transform-gpu transition-all duration-700 ease-out will-change-transform group-hover:scale-105"
        />

        {/* Liquid Aqua Glass Sheen (Subtle Water Refraction on Hover) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#002B49]/8 via-transparent to-[#38B6CD]/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Link>

      {/* 2. Fluid Minimalist Typography (Presisi Atas, Center Alignment, Zero Wasted Space) */}
      <div className="flex flex-col items-center justify-start text-center w-full">
        {/* Subtle Mineral Formula Tag */}
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#0B6E7D] font-medium truncate max-w-full mb-1">
          {formulaTag}
        </span>

        {/* Product Title (Dinamis, pas dengan teks) */}
        <h3 className="uppercase font-normal text-xs sm:text-[13px] text-[#002B49] leading-tight tracking-[0.06em] line-clamp-2 text-center group-hover:text-[#269BA8] transition-colors px-1">
          <Link to={`/products/${product.handle}`} className="block">
            {product.title}
          </Link>
        </h3>

        {/* Clean Centered Price (Mepet langsung di bawah judul) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap mt-1">
          <span className="font-medium text-xs sm:text-sm text-[#002B49] font-sans tracking-tight">
            {formatRupiah(currentPrice)}
          </span>
          {compareAtPrice && compareAtPrice > currentPrice && (
            <span className="text-[10px] sm:text-[11px] text-slate-400 line-through font-mono">
              {formatRupiah(compareAtPrice)}
            </span>
          )}
        </div>
      </div>

    </article>
  );
}
