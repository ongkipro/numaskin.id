import { useState } from 'react';
import { ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { formatRupiah, calculateDiscount, cleanVariantTitle } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface ProductPurchaseSuiteProps {
  product: Product;
  upsellProduct?: Product;
}

function cleanSubtitleText(subtitle?: string): string {
  if (!subtitle) return '';
  return subtitle
    .replace(/\s+Hydrating toner anti aging dengan.*$/i, '')
    .trim();
}

export function ProductPurchaseSuite({ product, upsellProduct }: ProductPurchaseSuiteProps) {
  const variants = product.variants?.nodes || [];
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = variants[selectedVariantIndex] || variants[0];

  const [quantity, setQuantity] = useState(1);
  const [includeUpsell, setIncludeUpsell] = useState(false);

  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrement = () => setQuantity((q) => q + 1);

  const currentPrice = selectedVariant?.price?.amount
    ? parseFloat(selectedVariant.price.amount)
    : parseFloat(product.priceRange.minVariantPrice.amount);

  const compareAtPrice = selectedVariant?.compareAtPrice?.amount
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : (product.compareAtPriceRange?.minVariantPrice.amount ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) : null);

  const discountPercent = compareAtPrice ? calculateDiscount(currentPrice, compareAtPrice) : 0;

  const upsellPrice = upsellProduct ? parseFloat(upsellProduct.priceRange.minVariantPrice.amount) : 0;
  const totalPrice = (currentPrice * quantity) + (includeUpsell ? upsellPrice : 0);

  const variantNumericId = selectedVariant?.id ? selectedVariant.id.split('/').pop() : '';
  const upsellNumericId = (includeUpsell && upsellProduct?.variants?.nodes?.[0]?.id)
    ? upsellProduct.variants.nodes[0].id.split('/').pop()
    : null;

  const directCheckoutUrl = upsellNumericId
    ? `https://y2x75f-40.myshopify.com/cart/${variantNumericId}:${quantity},${upsellNumericId}:1`
    : `https://y2x75f-40.myshopify.com/cart/${variantNumericId}:${quantity}`;

  const handleAddToCart = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('numa:add-to-cart', {
          detail: {
            item: {
              id: `cart-${Date.now()}`,
              variantId: selectedVariant?.id || `gid://shopify/ProductVariant/${product.handle}-0`,
              title: product.title,
              handle: product.handle,
              variantTitle: cleanVariantTitle(selectedVariant?.title) || selectedVariant?.title,
              price: currentPrice,
              quantity: quantity,
              image: product.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg',
            },
          },
        })
      );
    }
  };

  const cleanedSubtitle = cleanSubtitleText(product.subtitle);

  return (
    <div className="flex flex-col justify-start w-full">
      
      {/* 01. Product Title */}
      <h1 className="font-serif text-2xl sm:text-[28px] lg:text-[32px] text-[#002B49] font-normal leading-snug mb-1.5">
        {product.title}
      </h1>

      {/* 03. Subtitle / Key Claim */}
      {cleanedSubtitle && (
        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-1 font-sans max-w-xl">
          {cleanedSubtitle}
        </p>
      )}

      {/* 04. Pricing Suite (Editorial Typography, Tanpa Box/Card) */}
      <div className="flex items-baseline gap-3 my-3 sm:my-3.5 flex-wrap">
        <span className="text-3xl sm:text-[32px] font-bold text-[#002B49] font-sans tracking-tight">
          {formatRupiah(currentPrice)}
        </span>
        {compareAtPrice && compareAtPrice > currentPrice && (
          <span className="text-sm sm:text-base text-slate-400 line-through font-mono">
            {formatRupiah(compareAtPrice)}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF5F8] text-[#0B6E7D] font-bold border border-[#269BA8]/30">
            HEMAT {discountPercent}%
          </span>
        )}
      </div>

      {/* 05. Variant Selector (if multiple variants exist) */}
      {variants.length > 1 && (
        <div className="mb-4">
          <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-2">
            PILIHAN UKURAN / VARIAN:
          </span>
          <div className="flex flex-wrap gap-2">
            {variants.map((v, vIdx) => {
              const cleanTitle = cleanVariantTitle(v.title) || `Pilihan ${vIdx + 1}`;
              const isSelected = selectedVariantIndex === vIdx;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantIndex(vIdx)}
                  className={`px-4 py-1.5 text-xs !rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'btn-glass-primary'
                      : 'btn-glass-outline text-slate-700'
                  }`}
                >
                  {cleanTitle}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 06. Frequently Bought Together / Routine Upsell (Soft Translucent Mist) */}
      {upsellProduct && (
        <div className="mb-5 p-3.5 sm:p-4 rounded-xl bg-white/50 hover:bg-white/70 backdrop-blur-xs border border-white/80 hover:border-[#269BA8]/30 transition-all shadow-none">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpsell}
              onChange={(e) => setIncludeUpsell(e.target.checked)}
              className="mt-1 w-3.5 h-3.5 rounded-xs text-[#002B49] focus:ring-[#002B49] accent-[#002B49]"
            />
            <div className="text-xs">
              <span className="font-semibold text-[#002B49] block">
                Lengkapi Rutinitas dengan: {upsellProduct.title}
              </span>
              <span className="text-slate-500 block mt-0.5">
                Tambahkan dengan harga spesial: <strong className="text-[#0B6E7D] font-mono">{formatRupiah(upsellPrice)}</strong>
              </span>
            </div>
          </label>
        </div>
      )}

      {/* 07. Action Suite: Quantity + Add to Cart & Beli Sekarang (Direct Checkout) */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-slate-200/90 rounded-full bg-white/90 p-1 shadow-2xs">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-[#002B49] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Kurangi jumlah"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center font-mono font-semibold text-xs text-[#002B49] select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-[#002B49] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Tambah jumlah"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button (Clean UI/UX: Single ShoppingBag Icon without redundant + symbol) */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn-glass-secondary flex-1 py-3 px-5 !rounded-full font-semibold text-xs sm:text-[13px] tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#0B6E7D]" />
            <span>Tambah ke Keranjang</span>
          </button>
        </div>

        {/* Primary CTA: Beli Sekarang (Direct Checkout ke Shopify) */}
        <a
          href={directCheckoutUrl}
          className="btn-glass-primary w-full py-3.5 px-6 !rounded-full font-semibold text-xs sm:text-[13px] tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Beli Sekarang · {formatRupiah(totalPrice)}</span>
          <ArrowRight className="w-4 h-4 text-[#38B6CD]" />
        </a>

        {/* Trust Badges Minimalis (No AI Slop) */}
        <div className="flex items-center justify-center gap-4 text-[10px] sm:text-[10.5px] font-mono text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8]" />
            Direct Checkout Resmi
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8]" />
            Garansi BPOM RI
          </span>
          <span className="flex items-center gap-1 hidden sm:flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8]" />
            Gratis Ongkir &gt; Rp 200rb
          </span>
        </div>
      </div>

    </div>
  );
}
