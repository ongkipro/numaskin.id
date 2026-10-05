import { useState, useMemo, useRef, useEffect } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router';
import type { Route } from './+types/collections.$handle';
import * as mockCatalog from '~/lib/mock-catalog';
import { ProductCard } from '~/components/product/ProductCard';
import { SlidersHorizontal, ChevronDown, X, Check, Loader2, Layers, Droplets, ArrowUpDown } from 'lucide-react';

export const meta: Route.MetaFunction = ({ data }: { data: any }) => {
  if (!data?.collection) {
    return [{ title: 'Koleksi Tidak Ditemukan - Numa Skin' }];
  }
  const c = data.collection;
  const rawTitle = c.seoTitle || c.title;
  const title = rawTitle.toLowerCase().includes('numa skin')
    ? rawTitle
    : `${rawTitle} - Numa Skin Official`;
  const description =
    c.seoDescription ||
    c.description ||
    `Koleksi resmi produk ${c.title} Numa Skin terdaftar BPOM RI. Formula aktif mineral laut dalam untuk hidrasi dan perawatan intensif.`;
  const canonicalUrl = `https://numaskin.id/collections/${c.handle}`;
  const image = c.image?.url || '/images/banners/04-category-banner-kategori-paket-awet-muda-banner.jpg';

  const firstProductImage = data?.products?.[0]?.featuredImage?.url;

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    ...(firstProductImage
      ? [
          {
            tagName: 'link',
            rel: 'preload',
            as: 'image',
            href: firstProductImage,
            // @ts-ignore
            fetchPriority: 'high',
          },
        ]
      : []),

    // OpenGraph
    { property: 'og:site_name', content: 'Numa Skin Official' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    { property: 'og:image:alt', content: c.image?.altText || c.title },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  if (!handle) throw new Response('Not Found', { status: 404 });

  const result = mockCatalog.getCollectionByHandle(handle);
  if (!result) {
    throw new Response('Collection Not Found', { status: 404 });
  }

  const allCollections = mockCatalog.getAllCollections().filter((c) => c.handle !== 'frontpage');

  return {
    collection: result.collection,
    products: result.products,
    allCollections,
  };
}

const CONCERN_OPTIONS = [
  { value: 'all', label: 'Semua Kebutuhan' },
  { value: 'anti aging', label: 'Anti-Aging' },
  { value: 'skin barrier', label: 'Skin Barrier' },
  { value: 'brightening', label: 'Pencerah' },
  { value: 'bundling hemat', label: 'Paket Hemat' },
  { value: 'travel size', label: 'Travel Size' },
];

interface ThemeDropdownProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  isHighlightActive?: boolean;
  align?: 'left' | 'right';
  className?: string;
  prefix?: string;
  icon?: React.ReactNode;
}

function ThemeDropdown({
  label,
  value,
  options,
  onChange,
  isHighlightActive = false,
  align = 'left',
  className = '',
  prefix,
  icon,
}: ThemeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((o) => o.value === value) || options[0];
  const isCustomActive = isHighlightActive && value !== 'all';

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button with Aquatic Glassmorphism */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full appearance-none rounded-lg px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#269BA8] cursor-pointer transition-all duration-300 flex items-center justify-between gap-2 border select-none ${
          isCustomActive
            ? 'bg-gradient-to-r from-[#002B49] via-[#063B5D] to-[#0B6E7D] text-white border-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_16px_rgba(0,43,73,0.2)]'
            : 'bg-gradient-to-b from-white/90 via-white/75 to-[#EBF5F8]/70 hover:from-white hover:to-[#E0F2F5]/90 text-[#002B49] border-white/90 hover:border-[#269BA8]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,43,73,0.04)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_16px_rgba(38,155,168,0.12)] backdrop-blur-xl'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1.5 truncate">
          {icon && (
            <span className={`flex-shrink-0 ${isCustomActive ? 'text-[#38B6CD]' : 'text-[#269BA8]'}`}>
              {icon}
            </span>
          )}
          {isCustomActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#38B6CD] shadow-[0_0_6px_#38B6CD] flex-shrink-0 animate-pulse" />
          )}
          {prefix && <span className="opacity-70 font-normal mr-1">{prefix}</span>}
          <span className="truncate">{selectedOption?.label || label}</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          } ${isCustomActive ? 'text-[#38B6CD]' : 'text-[#0B6E7D]'}`}
        />
      </button>

      {/* Dropdown Menu (Deep Sea Liquid Glass Popover) */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute top-full mt-1.5 z-50 min-w-full sm:min-w-[210px] max-h-64 overflow-y-auto bg-white/90 backdrop-blur-2xl border border-white/95 rounded-xl shadow-[0_20px_50px_rgba(0,43,73,0.15),inset_0_1px_1px_rgba(255,255,255,1),0_0_0_1px_rgba(38,155,168,0.08)] p-1.5 scrollbar-thin animate-in fade-in zoom-in-95 duration-150 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#EBF5F8] to-[#D8EFF3] text-[#002B49] font-semibold shadow-2xs border border-[#269BA8]/20'
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-[#F4F9FA] hover:to-white hover:text-[#002B49]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0B6E7D] flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const PAGE_SIZE = 12;

export default function CollectionDetailPage() {
  const { collection, products, allCollections } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [activeConcern, setActiveConcern] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const collectionOptions = [
    { value: 'all', label: 'Semua Koleksi' },
    ...allCollections
      .filter((c) => c.handle !== 'all' && c.handle !== 'all-products')
      .map((col) => ({ value: col.handle, label: col.title })),
  ];

  const sortOptions = [
    { value: 'featured', label: 'Rekomendasi Utama' },
    { value: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
    { value: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
    { value: 'name', label: 'Nama Produk (A-Z)' },
  ];

  const handleClearAllFilters = () => {
    setActiveConcern('all');
    setSortBy('featured');
  };

  const hasActiveFilters = activeConcern !== 'all' || sortBy !== 'featured';

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Filter by skin concern tag
    if (activeConcern !== 'all') {
      const q = activeConcern.toLowerCase();
      list = list.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, sortBy, activeConcern]);

  // Reset pagination when collection, concern, or sorting changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [collection.handle, activeConcern, sortBy]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Tactile micro-interaction delay (200ms) for smooth responsive feel
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredAndSortedProducts.length));
      setIsLoadingMore(false);
    }, 200);
  };

  const totalProducts = filteredAndSortedProducts.length;
  const displayedProducts = filteredAndSortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < totalProducts;
  const progressPercent = totalProducts > 0 ? Math.min(100, Math.round((displayedProducts.length / totalProducts) * 100)) : 100;

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-24">
      {/* Schema.org CollectionPage & Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: collection.title,
              description: collection.seoDescription || collection.description,
              url: `https://numaskin.id/collections/${collection.handle}`,
              mainEntity: {
                '@type': 'ItemList',
                numberOfItems: products.length,
                itemListElement: products.slice(0, 12).map((p, idx) => ({
                  '@type': 'ListItem',
                  position: idx + 1,
                  name: p.title,
                  url: `https://numaskin.id/products/${p.handle}`,
                  image: p.featuredImage?.url,
                })),
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Beranda',
                  item: 'https://numaskin.id',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Koleksi',
                  item: 'https://numaskin.id/collections',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: collection.title,
                  item: `https://numaskin.id/collections/${collection.handle}`,
                },
              ],
            },
          ]),
        }}
      />
      
      {/* 01. Collection Hero Header (Editorial Split & Seamless 3:2 Landscape) */}
      <section className="w-full pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-14 items-center">
            
            {/* Left Content Column (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Minimalist Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 select-none">
                <ol className="flex items-center gap-1.5 sm:gap-2 font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
                  <li>
                    <Link to="/" className="hover:text-[#002B49] transition-colors">
                      Beranda
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-[#269BA8]/50">
                    /
                  </li>
                  <li>
                    <Link to="/collections" className="hover:text-[#002B49] transition-colors">
                      Koleksi
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-[#269BA8]/50">
                    /
                  </li>
                  <li className="font-semibold text-[#002B49]" aria-current="page">
                    {collection.title}
                  </li>
                </ol>
              </nav>

              {/* Collection Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl text-[#002B49] font-normal leading-[1.14] tracking-[-0.01em] mb-2.5 sm:mb-3">
                {collection.title}
              </h1>

              {/* Description */}
              {collection.description && (
                <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed max-w-xl font-sans">
                  {collection.description}
                </p>
              )}
            </div>

            {/* Right Ocean Window Column (5 cols on desktop, aspect 3:2 seamlessly blended into background) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
              <div className="relative aspect-[3/2] w-full max-w-[560px] lg:max-w-none rounded-2xl overflow-hidden group select-none shadow-[0_20px_50px_-20px_rgba(38,155,168,0.15)]">
                {/* 3:2 Master Collection Photography */}
                <img
                  src={collection.image?.url || '/images/collections/collection-semua-produk-banner.webp'}
                  alt={collection.image?.altText || collection.title}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Seamless Edge Blending Overlays (Melt edges into #F4F9FA page canvas) */}
                {/* Left Edge Dissolve */}
                <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-[#F4F9FA] via-[#F4F9FA]/40 to-transparent pointer-events-none" />
                {/* Bottom Edge Dissolve */}
                <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-[#F4F9FA] via-[#F4F9FA]/50 to-transparent pointer-events-none" />
                {/* Top Edge Subtle Softening */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F4F9FA]/70 via-transparent to-transparent pointer-events-none" />
                {/* Right Edge Subtle Softening */}
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F4F9FA]/60 via-transparent to-transparent pointer-events-none" />

                {/* Liquid Aqua Sheen Hover Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#002B49]/10 via-transparent to-[#38B6CD]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 02. Shopify Clean Filter Toolbar & Product Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Aquatic Glass Floating Dock Toolbar */}
        <div className="relative z-30 mb-8 p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-white/70 via-[#EBF5F8]/45 to-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,43,73,0.04),inset_0_1px_2px_rgba(255,255,255,0.95)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
            
            {/* Filter Dropdowns (Grid 2-col on Mobile, Inline on Desktop) */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
              
              {/* Koleksi Dropdown */}
              <ThemeDropdown
                label="Koleksi"
                value={collection.handle}
                options={collectionOptions}
                onChange={(newHandle) => navigate(`/collections/${newHandle}`)}
                icon={<Layers className="w-3.5 h-3.5" />}
                className="w-full sm:w-auto sm:min-w-[170px]"
              />

              {/* Kebutuhan Kulit Dropdown */}
              <ThemeDropdown
                label="Kebutuhan"
                value={activeConcern}
                options={CONCERN_OPTIONS}
                onChange={(newConcern) => setActiveConcern(newConcern)}
                isHighlightActive={true}
                icon={<Droplets className="w-3.5 h-3.5" />}
                align="right"
                className="w-full sm:w-auto sm:min-w-[170px]"
              />

            </div>

            {/* Right: Aquatic Product Count Capsule & Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 flex-shrink-0 w-full sm:w-auto pt-1 sm:pt-0">
              
              {/* Aquatic Mineral Formula Counter Capsule */}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 backdrop-blur-md border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,43,73,0.03)] select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#269BA8] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0B6E7D]"></span>
                </span>
                <span className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider text-[#002B49] font-medium whitespace-nowrap">
                  {totalProducts > PAGE_SIZE
                    ? `${displayedProducts.length} / ${totalProducts} Formula`
                    : `${totalProducts} Formula`}
                </span>
              </div>

              {/* Sort Dropdown */}
              <ThemeDropdown
                label="Urutkan"
                value={sortBy}
                options={sortOptions}
                onChange={(newSort) => setSortBy(newSort as any)}
                icon={<ArrowUpDown className="w-3.5 h-3.5" />}
                align="right"
                className="min-w-[155px] sm:min-w-[180px]"
              />
            </div>

          </div>

          {/* Active Filter Chips & Clear All ("Hapus Semua") */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap pt-2.5 px-1 text-xs select-none border-t border-white/50 mt-2.5 animate-in fade-in duration-150">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Filter Aktif:
              </span>

              {activeConcern !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveConcern('all')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/95 text-xs font-medium text-[#002B49] border border-[#269BA8]/30 hover:border-[#269BA8] transition-colors shadow-2xs cursor-pointer group"
                  title="Hapus filter kebutuhan ini"
                >
                  <Droplets className="w-3 h-3 text-[#269BA8]" />
                  <span>Kebutuhan: <strong className="font-semibold capitalize">{CONCERN_OPTIONS.find((o) => o.value === activeConcern)?.label || activeConcern}</strong></span>
                  <X className="w-3 h-3 text-slate-400 group-hover:text-rose-500" />
                </button>
              )}

              {sortBy !== 'featured' && (
                <button
                  type="button"
                  onClick={() => setSortBy('featured')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/95 text-xs font-medium text-[#002B49] border border-[#269BA8]/30 hover:border-[#269BA8] transition-colors shadow-2xs cursor-pointer group"
                  title="Reset urutan"
                >
                  <ArrowUpDown className="w-3 h-3 text-[#269BA8]" />
                  <span>Urutan: <strong className="font-semibold">{sortOptions.find((o) => o.value === sortBy)?.label || sortBy}</strong></span>
                  <X className="w-3 h-3 text-slate-400 group-hover:text-rose-500" />
                </button>
              )}

              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-xs text-[#0B6E7D] hover:text-[#002B49] underline underline-offset-4 font-semibold transition-colors ml-1 cursor-pointer"
              >
                Hapus Semua
              </button>
            </div>
          )}

        </div>

        {/* 03. 4-Col Desktop / 2-Col Mobile Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-4 lg:gap-x-6 gap-y-8 sm:gap-y-10">
              {displayedProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={idx < 4}
                />
              ))}
            </div>

            {/* 04. Luxury Progress & Load More Section */}
            {totalProducts > PAGE_SIZE && (
              <div className="mt-12 sm:mt-16 pt-2 text-center max-w-sm mx-auto flex flex-col items-center">
                {/* Progress Counter & Slim Aesthetic Track */}
                <div className="w-full mb-5">
                  <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-slate-500 mb-2">
                    <span>Menampilkan {displayedProducts.length} dari {totalProducts} formula</span>
                    <span className="font-semibold text-[#0B6E7D]">{progressPercent}%</span>
                  </div>
                  
                  {/* Ocean Progress Track */}
                  <div className="w-full h-1 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0B6E7D] via-[#269BA8] to-[#38B6CD] transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Load More Button or Completed Marker */}
                {hasMore ? (
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-white/95 hover:bg-white text-[#002B49] hover:text-[#0B6E7D] border border-white/90 hover:border-[#269BA8]/40 text-xs font-semibold uppercase tracking-wider shadow-[0_2px_10px_rgba(0,43,73,0.04)] hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.99]"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#269BA8]" />
                        <span className="font-sans normal-case tracking-normal">Menyiapkan Formula...</span>
                      </>
                    ) : (
                      <>
                        <span>Muat Lebih Banyak ({Math.min(PAGE_SIZE, totalProducts - displayedProducts.length)})</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#0B6E7D] transition-transform duration-200 group-hover:translate-y-0.5" />
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[10.5px] uppercase tracking-widest pt-2">
                    <span className="text-[#269BA8]">✦</span>
                    <span>Seluruh {totalProducts} formula telah ditampilkan</span>
                    <span className="text-[#269BA8]">✦</span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#EBF5F8] text-[#0B6E7D] flex items-center justify-center mb-3">
              <SlidersHorizontal className="w-5 h-5 text-[#269BA8]" />
            </div>
            <h3 className="font-serif text-lg text-[#002B49] font-normal mb-1">
              Tidak ada formula yang cocok
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mb-4">
              Tidak ditemukan produk dengan kombinasi filter yang dipilih. Coba reset filter untuk melihat seluruh formula.
            </p>
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="px-5 py-2.5 rounded-lg bg-[#002B49] text-white text-xs font-semibold hover:bg-[#063352] transition-colors shadow-xs cursor-pointer"
            >
              Hapus Semua Filter
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
