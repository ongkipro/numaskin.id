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
  const secondaryImageUrl = product.secondaryImage?.url && product.secondaryImage.url !== imageUrl
    ? product.secondaryImage.url
    : null;

  return (
    <article className="group flex flex-col justify-between relative p-3 sm:p-4 rounded-xl bg-white hover:bg-[#F8FCFD] transition-all duration-200 border border-slate-100/90 hover:border-[#38B6CD]/30">
      
      {/* Badges Bar */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        {discountPercent > 0 ? (
          <span className="bg-[#002B49] text-white font-mono text-[10px] font-medium px-2 py-0.5 rounded-full tracking-wider">
            HEMAT {discountPercent}%
          </span>
        ) : (
          <span className="font-mono text-[10px] text-[#0B6E7D] font-medium uppercase tracking-wider">
            OFFICIAL
          </span>
        )}

        {product.bpom && (
          <span className="font-mono text-[9px] text-slate-400">
            {product.bpom}
          </span>
        )}
      </div>

      {/* Product Image Viewport (Frameless, Clean) */}
      <Link
        to={`/products/${product.handle}`}
        className="block relative aspect-square w-full overflow-hidden rounded-sm mb-3"
      >
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          className={`w-full h-full object-contain rounded-sm p-1 transition-all duration-300 ${
            secondaryImageUrl ? 'group-hover:opacity-0 group-hover:scale-102' : 'group-hover:scale-103'
          }`}
        />
        {secondaryImageUrl && (
          <img
            src={secondaryImageUrl}
            alt={`${product.title} - Tampilan Sudut`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain rounded-sm p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-102"
          />
        )}
      </Link>

      {/* Product Info Block */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category / Netto Kicker */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span className="uppercase text-[#0B6E7D] font-medium tracking-wider">
              {product.productType || 'SKINCARE'}
            </span>
            {product.netto && <span>{product.netto}</span>}
          </div>

          {/* Title */}
          <h3 className="font-medium text-xs sm:text-sm text-slate-800 leading-snug line-clamp-2 group-hover:text-[#002B49] transition-colors mb-2">
            <Link to={`/products/${product.handle}`}>
              {product.title}
            </Link>
          </h3>
        </div>

        {/* Pricing Block & Quick ATC Button (Clean, Borderless) */}
        <div className="pt-1.5 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base text-[#002B49] font-sans">
              {formatRupiah(currentPrice)}
            </span>
            {compareAtPrice && compareAtPrice > currentPrice && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatRupiah(compareAtPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {onAddToCart ? (
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="w-8 h-8 rounded-full bg-[#F4F9FA] hover:bg-[#002B49] text-[#002B49] hover:text-white transition-colors flex items-center justify-center"
                aria-label={`Tambah ${product.title} ke keranjang`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                to={`/products/${product.handle}`}
                className="w-8 h-8 rounded-full bg-[#F4F9FA] hover:bg-[#002B49] text-[#002B49] hover:text-white transition-colors flex items-center justify-center"
                aria-label={`Lihat ${product.title}`}
              >
                <Eye className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

      </div>

    </article>
  );
}
