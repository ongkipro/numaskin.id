import { useState, useMemo } from 'react';
import { ShieldCheck, Play } from 'lucide-react';
import type { Product } from '~/lib/mock-catalog';

export interface GalleryMedia {
  type: 'image' | 'video';
  url: string;
  altText: string;
  previewUrl: string;
}

interface ProductGalleryProps {
  product: Product;
  discountPercent?: number;
}

export function ProductGallery({ product, discountPercent = 0 }: ProductGalleryProps) {
  const images = product.images?.nodes || [];
  const primaryImage = product.featuredImage?.url || images[0]?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';

  // Construct deduplicated media items:
  // Thumbnail 1 = Primary Packshot, Thumbnail 2 = Video (if exists), rest = Unique angles (max 8 items total)
  const mediaItems = useMemo<GalleryMedia[]>(() => {
    const list: GalleryMedia[] = [];
    const seenUrls = new Set<string>();

    // 01. Thumbnail 1: Primary Packshot Image
    list.push({
      type: 'image',
      url: primaryImage,
      altText: product.featuredImage?.altText || product.title,
      previewUrl: primaryImage,
    });
    seenUrls.add(primaryImage);

    // 02. Thumbnail 2: Video (if product has video, strictly placed at slot #2)
    if (product.videoUrl) {
      const videoPoster = images.find((img) => img.url !== primaryImage)?.url || primaryImage;
      list.push({
        type: 'video',
        url: product.videoUrl,
        altText: product.videoAltText || `${product.title} - Official Video`,
        previewUrl: videoPoster,
      });
    }

    // Helper to extract shot type suffix to avoid duplicate angles across variants (e.g. 50ml vs 150ml)
    const getShotType = (url: string) => {
      const match = url.match(/(0\d-[a-z]+|clean-1x1)/i);
      return match ? match[1].toLowerCase() : url.split('?')[0];
    };

    const seenShots = new Set<string>();
    seenShots.add(getShotType(primaryImage));

    // 03. Remaining product images (deduplicated & filtered)
    for (const img of images) {
      if (!img.url || seenUrls.has(img.url)) continue;
      const shot = getShotType(img.url);
      if (seenShots.has(shot)) continue;
      seenShots.add(shot);
      seenUrls.add(img.url);

      list.push({
        type: 'image',
        url: img.url,
        altText: img.altText || product.title,
        previewUrl: img.url,
      });

      // Cap at 8 high-value distinct media items for maximum precision
      if (list.length >= 8) break;
    }

    return list;
  }, [product, primaryImage, images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = mediaItems[activeIndex] || mediaItems[0];

  return (
    <div className="sticky top-28 space-y-3.5">
      {/* 01. Primary Active Media Canvas: Pure Edge-to-Edge Fill (Tanpa Frame/Border/Badge/Count, Bersih & Luas) */}
      <div className="relative aspect-square w-full rounded-2xl bg-[#F4F9FA] overflow-hidden select-none block group shadow-none border-0">
        {/* Active Media Renderer (Edge-to-Edge Fill) */}
        {activeMedia.type === 'video' ? (
          <div className="w-full h-full flex items-center justify-center bg-black/5">
            <video
              key={activeMedia.url}
              src={activeMedia.url}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              poster={activeMedia.previewUrl}
            />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              key={activeMedia.url}
              src={activeMedia.url}
              alt={activeMedia.altText}
              className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
            />
            {/* Subtle Liquid Aqua Sheen on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#002B49]/8 via-transparent to-[#38B6CD]/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        )}
      </div>

      {/* 03. Mini Thumbnails Row: Tepat 5 Thumbnail Presisi di Layar, UI/UX Rapih & Edge-to-Edge */}
      {mediaItems.length > 1 && (
        <div className="w-full">
          <div className="-mx-2 px-2 sm:-mx-2.5 sm:px-2.5 flex items-center gap-2 sm:gap-[10px] overflow-x-auto py-2 sm:py-3 scrollbar-none snap-x snap-mandatory scroll-pl-2 sm:scroll-pl-2.5">
            {mediaItems.map((item, idx) => {
              const isSelected = activeIndex === idx;
              const isVideo = item.type === 'video';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group/thumb w-[calc((100%_-_32px)_/_5)] min-w-[calc((100%_-_32px)_/_5)] sm:w-[68px] sm:h-[68px] sm:min-w-[68px] aspect-square rounded-xl overflow-hidden flex-shrink-0 snap-start transition-all duration-300 relative p-0 bg-white cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#269BA8] focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'ring-2 ring-[#269BA8] ring-offset-2 ring-offset-[#F4F9FA] sm:ring-offset-white shadow-[0_4px_14px_rgba(38,155,168,0.22)] opacity-100'
                      : 'ring-1 ring-slate-200/90 opacity-60 hover:opacity-100 hover:ring-2 hover:ring-[#269BA8]/50 hover:ring-offset-1 hover:ring-offset-white hover:shadow-xs'
                  }`}
                  aria-label={isVideo ? `Lihat Video Produk` : `Lihat Foto ${idx + 1}`}
                  aria-current={isSelected ? 'true' : undefined}
                >
                  <img
                    src={item.previewUrl}
                    alt={item.altText}
                    className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover/thumb:scale-108"
                  />

                  {/* Video Play Overlay Badge strictly for Thumbnail #2 */}
                  {isVideo && (
                    <div className="absolute inset-0 bg-[#002B49]/40 backdrop-blur-2xs flex flex-col items-center justify-center text-white transition-colors duration-300 group-hover/thumb:bg-[#002B49]/30">
                      <div className="w-6 h-6 rounded-full bg-[#269BA8] group-hover/thumb:bg-[#38B6CD] flex items-center justify-center shadow-xs transition-transform duration-300 group-hover/thumb:scale-110">
                        <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                      </div>
                      <span className="font-mono text-[6.5px] uppercase font-bold tracking-widest mt-0.5 text-white/95">
                        VIDEO
                      </span>
                    </div>
                  )}

                  {/* Subtle active inner sheen on selected image */}
                  {isSelected && !isVideo && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#269BA8]/10 via-transparent to-transparent pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 04. 14-Day Clinical Guarantee Box (Card Aman & Terpercaya - Ringkas & Glassy di Mobile) */}
      <div className="px-3 py-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/85 sm:bg-white/90 backdrop-blur-md border border-white/90 sm:border-white/95 shadow-[0_2px_12px_rgba(0,43,73,0.03)] sm:shadow-[0_4px_20px_rgba(0,43,73,0.04)] flex items-center sm:items-start gap-2.5 sm:gap-3.5">
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#EBF5F8] text-[#0B6E7D] flex items-center justify-center flex-shrink-0 border border-[#269BA8]/20">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#269BA8]" />
        </div>
        <div className="flex-1 min-w-0 text-slate-700 font-sans">
          <div className="flex items-center gap-1.5 flex-wrap">
            <strong className="text-[#002B49] font-semibold text-xs sm:text-[13px] leading-tight">
              Garansi Resmi 14 Hari
            </strong>
            <span className="inline-flex items-center text-[9.5px] sm:hidden font-medium text-[#0B6E7D] bg-[#EBF5F8] px-1.5 py-0.5 rounded-full border border-[#269BA8]/20">
              100% BPOM &amp; Halal
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-600 sm:text-slate-700 leading-snug sm:leading-relaxed mt-0.5">
            <span className="sm:hidden">
              Formula Deep Sea Water teruji klinis melembapkan tanpa iritasi.
            </span>
            <span className="hidden sm:inline">
              Uji klinis membuktikan kemurnian Ulleung Island Deep Sea Water menembus lapisan pelindung kulit tanpa memicu iritasi. 100% Terdaftar BPOM RI dan Halal Indonesia.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
