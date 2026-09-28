import { Link } from 'react-router';

const SHOPEE_2X3_BANNERS = [
  {
    id: 'treatment-lotion-150',
    title: 'Deep Sea Water Treatment Lotion 150ml',
    imageUrl: '/images/banners/shopee/shopee-banner-2x3-01.webp',
    href: '/products/deep-sea-water-treatment-lotion',
  },
  {
    id: 'gloss-gel-moisturizer',
    title: 'Gloss Gel Moisturizer 30ml',
    imageUrl: '/images/banners/shopee/shopee-banner-2x3-02.webp',
    href: '/products/calming-barrier-gloss-gel-moisturizer',
  },
  {
    id: 'treatment-lotion-50',
    title: 'Deep Sea Water Treatment Lotion 50ml',
    imageUrl: '/images/banners/shopee/shopee-banner-2x3-03.webp',
    href: '/products/deep-sea-water-treatment-lotion',
  },
];

export function ShopeeBannerSection() {
  return (
    <section className="w-full pt-4 pb-6 sm:pt-6 sm:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 Banners in Native 2:3 Ratio (1080x1600) — Mepet Antar Kolom & Frameless */}
        <div className="flex sm:grid sm:grid-cols-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory gap-1 sm:gap-1.5 pb-1 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {SHOPEE_2X3_BANNERS.map((banner) => (
            <Link
              key={banner.id}
              to={banner.href}
              className="group relative aspect-[1080/1600] w-[82vw] max-w-[340px] sm:max-w-none sm:w-full shrink-0 sm:shrink snap-center rounded-sm overflow-hidden bg-[#F4F9FA] shadow-xs hover:shadow-md transition-all duration-300 block"
            >
              {/* Pure Frameless Image Fill */}
              <img
                src={banner.imageUrl}
                alt={banner.title}
                loading="lazy"
                className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out will-change-transform group-hover:scale-102"
              />

              {/* Gentle Liquid Hover Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#002B49]/8 via-transparent to-[#269BA8]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
