import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingBag, Search, Menu, X, ChevronDown, ArrowRight, User } from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
}

interface CategoryCardItem {
  handle: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  to: string;
}

interface RecentProductItem {
  handle: string;
  title: string;
  shortTitle: string;
  price: string;
  compareAtPrice?: string;
  tag: string;
  image: string;
}

const MAIN_CATEGORIES: CategoryCardItem[] = [
  {
    handle: 'anti-aging-series',
    title: 'Anti-Aging Series',
    subtitle: 'Regenerasi 2% NAD+',
    badge: 'Unggulan Klinis',
    image: '/images/collections/collection-anti-aging-series-banner.webp',
    to: '/collections/anti-aging-series',
  },
  {
    handle: 'cleanser-toner',
    title: 'Pembersih & Toner',
    subtitle: 'Hidrasi Mineral Laut',
    badge: 'Gentle Cleanse',
    image: '/images/collections/collection-pembersih-toner-banner.webp',
    to: '/collections/cleanser-toner',
  },
  {
    handle: 'serum-treatment',
    title: 'Serum & Perawatan',
    subtitle: 'Konsentrat Seluler',
    badge: 'High Potency',
    image: '/images/collections/collection-serum-treatment-banner.webp',
    to: '/collections/serum-treatment',
  },
  {
    handle: 'moisturizer-day-cream',
    title: 'Pelembap & Krim',
    subtitle: 'Barrier & PDRN Lock',
    badge: 'Barrier Recovery',
    image: '/images/collections/collection-pelembap-krim-pagi-banner.webp',
    to: '/collections/moisturizer-day-cream',
  },
  {
    handle: 'sunscreen-protection',
    title: 'Tabir Surya Oxydew',
    subtitle: 'UV SPF 50+ PA++++',
    badge: 'No White Cast',
    image: '/images/collections/collection-tabir-surya-perlindungan-banner.webp',
    to: '/collections/sunscreen-protection',
  },
];

const RECENT_PRODUCTS: RecentProductItem[] = [
  {
    handle: 'numa-skin-nad-booster-anti-aging-serum-20ml',
    title: 'Numa Skin NAD+ Booster Anti-Aging Serum 20ml',
    shortTitle: 'NAD+ Booster Serum 20ml',
    price: 'Rp 108.999',
    compareAtPrice: 'Rp 179.000',
    tag: '2% NAD+ & 7x Peptide',
    image: '/images/seo/numa-skin-nad-booster-anti-aging-serum-20ml-01-front.webp',
  },
  {
    handle: 'numa-skin-deep-sea-water-treatment-lotion',
    title: 'Numa Skin Deep Sea Water Treatment Lotion 150ml',
    shortTitle: 'Treatment Lotion 150ml',
    price: 'Rp 79.000',
    compareAtPrice: 'Rp 129.000',
    tag: '82.5% Mineral Laut Dalam',
    image: '/images/seo/numa-skin-deep-sea-water-treatment-lotion-150ml-01-front.webp',
  },
  {
    handle: 'numa-skin-adenosine-deep-sea-water-moisturizer-30g',
    title: 'Numa Skin Adenosine Deep Sea Water Moisturizer 30g',
    shortTitle: 'Adenosine Moisturizer 30g',
    price: 'Rp 78.999',
    compareAtPrice: 'Rp 125.000',
    tag: 'Kolagen & Elastisitas',
    image: '/images/seo/numa-skin-adenosine-deep-sea-water-moisturizer-30g-01-front.webp',
  },
  {
    handle: 'numa-skin-oxydew-sunscreen-luceane-spf50-30ml',
    title: 'Numa Skin Oxydew Sunscreen Luceane SPF 50+ 30ml',
    shortTitle: 'Oxydew Sunscreen 30ml',
    price: 'Rp 79.000',
    compareAtPrice: 'Rp 119.000',
    tag: 'Broad Spectrum UV Shield',
    image: '/images/seo/numa-skin-oxydew-sunscreen-luceane-spf50-30ml-01-front.webp',
  },
];

export function Header({ cartItemCount = 0, onOpenCart, onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryAccordionOpen, setMobileCategoryAccordionOpen] = useState(true);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCollectionsDropdownOpen(false);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, [location.pathname]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Track scroll position for subtle elevation shadow and auto-close mega menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      if (window.scrollY > 60) {
        setCollectionsDropdownOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setCollectionsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setCollectionsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Mega menu hover grace handling (180ms threshold prevents diagonal mouse drop)
  const handleMouseEnterKategori = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setCollectionsDropdownOpen(true);
  };

  const handleMouseLeaveKategori = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setCollectionsDropdownOpen(false);
    }, 180);
  };

  const handleMouseEnterDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeaveDropdown = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setCollectionsDropdownOpen(false);
    }, 180);
  };

  const isHome = location.pathname === '/';
  const isKategoriActive =
    collectionsDropdownOpen ||
    (location.pathname.startsWith('/collections') && location.pathname !== '/collections/paket-hemat-bundling');
  const isBundlingActive = location.pathname === '/collections/paket-hemat-bundling';
  const isBlogActive = location.pathname.startsWith('/blogs');

  // Trigger sticky aqua-glass effect when scrolled, hovered, or dropdown is open
  const showAquaGlass = isScrolled || isHeaderHovered || collectionsDropdownOpen;

  return (
    <header
      ref={headerRef}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => {
        setIsHeaderHovered(false);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setCollectionsDropdownOpen(false);
      }}
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 border-none ${
        isHome
          ? showAquaGlass
            ? 'aqua-glass-panel text-slate-800 shadow-[0_4px_30px_rgba(0,43,73,0.06)]'
            : 'bg-transparent text-[#002B49]'
          : 'aqua-glass-panel text-slate-800 shadow-[0_2px_16px_rgba(0,43,73,0.04)]'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Bar (h-16 mobile, h-20 desktop) */}
        <div className="h-16 sm:h-20 flex items-center justify-between">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Desktop Navigation / Mobile Menu Trigger     */}
          {/* ========================================================= */}
          <div className="flex items-center flex-1">
            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 focus:outline-hidden transition-colors text-[#002B49] hover:text-[#269BA8]"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Navigation Links (Zero Layout Shift on Click/Hover) */}
            <nav className="hidden lg:flex items-center gap-1.5 sm:gap-2">
              {/* Kategori Trigger */}
              <button
                type="button"
                onMouseEnter={handleMouseEnterKategori}
                onMouseLeave={handleMouseLeaveKategori}
                onClick={() => setCollectionsDropdownOpen(!collectionsDropdownOpen)}
                className={`group text-xs uppercase tracking-[0.08em] font-medium flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors duration-150 cursor-pointer ${
                  isKategoriActive
                    ? 'bg-[#002B49]/8 text-[#002B49]'
                    : 'text-slate-700 hover:text-[#002B49] hover:bg-[#002B49]/5'
                }`}
                aria-expanded={collectionsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Kategori</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                    collectionsDropdownOpen
                      ? 'rotate-180 text-[#269BA8]'
                      : 'text-slate-400 group-hover:text-[#002B49]'
                  }`}
                />
              </button>

              {/* Direct Link: Paket Bundling */}
              <Link
                to="/collections/paket-hemat-bundling"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                  setCollectionsDropdownOpen(false);
                }}
                className={`text-xs uppercase tracking-[0.08em] font-medium flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors duration-150 ${
                  isBundlingActive
                    ? 'bg-[#002B49]/8 text-[#002B49]'
                    : 'text-slate-700 hover:text-[#002B49] hover:bg-[#002B49]/5'
                }`}
              >
                <span>Paket Bundling</span>
              </Link>

              {/* Direct Link: Blog */}
              <Link
                to="/blogs"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                  setCollectionsDropdownOpen(false);
                }}
                className={`text-xs uppercase tracking-[0.08em] font-medium flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors duration-150 ${
                  isBlogActive
                    ? 'bg-[#002B49]/8 text-[#002B49]'
                    : 'text-slate-700 hover:text-[#002B49] hover:bg-[#002B49]/5'
                }`}
              >
                <span>Blog</span>
              </Link>
            </nav>
          </div>

          {/* ========================================================= */}
          {/* CENTER COLUMN: Pristine Brand Identity (Dead Centered)   */}
          {/* ========================================================= */}
          <div
            onMouseEnter={() => {
              if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
              setCollectionsDropdownOpen(false);
            }}
            className="flex flex-col items-center justify-center shrink-0 px-2"
          >
            <Link to="/" className="group flex flex-col items-center text-center">
              <span className="font-sans font-medium text-lg sm:text-xl tracking-[0.22em] uppercase transition-colors text-[#002B49] group-hover:text-[#269BA8]">
                NUMA · SKIN
              </span>
              <span className="text-[10px] tracking-[0.35em] font-normal -mt-0.5 transition-colors text-[#0B6E7D]">
                ヌマスキン
              </span>
            </Link>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Search Icon, Account Icon, Shopping Bag     */}
          {/* ========================================================= */}
          <div
            onMouseEnter={() => {
              if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
              setCollectionsDropdownOpen(false);
            }}
            className="flex items-center justify-end gap-1 sm:gap-2 flex-1"
          >
            {/* Search Trigger Icon */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-hidden text-[#002B49] hover:text-[#269BA8] hover:bg-[#002B49]/5 cursor-pointer"
              aria-label="Pencarian katalog produk"
            >
              <Search className="w-4.5 h-4.5" strokeWidth={1.8} />
            </button>

            {/* Customer Account Trigger Icon */}
            <Link
              to="/account"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-hidden text-[#002B49] hover:text-[#269BA8] hover:bg-[#002B49]/5"
              aria-label="Akun Saya"
            >
              <User className="w-4.5 h-4.5" strokeWidth={1.8} />
            </Link>

            {/* Shopping Bag Trigger Icon */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-hidden text-[#002B49] hover:text-[#269BA8] hover:bg-[#002B49]/5 cursor-pointer"
              aria-label={`Buka keranjang belanja (${cartItemCount} produk)`}
            >
              <ShoppingBag className="w-4.5 h-4.5" strokeWidth={1.8} />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] font-mono font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center bg-[#002B49] text-white shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MEGA MENU: Matches Sticky Background (aqua-glass-panel)   */}
        {/* ========================================================= */}
        {collectionsDropdownOpen && (
          <div
            className="hidden lg:block absolute top-full inset-x-4 sm:inset-x-6 lg:inset-x-8 pt-2 pb-4 z-50 animate-in fade-in-50 slide-in-from-top-1.5 duration-200"
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <div className="w-full aqua-glass-panel rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,43,73,0.18)] p-5 lg:p-6 relative overflow-hidden border border-white/90">
              
              {/* Shimmer Accent Line */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#269BA8]/40 to-transparent" />

              {/* =================================================== */}
              {/* SECTION 1: KATEGORI UTAMA (MODEL BANNER 3:2)        */}
              {/* =================================================== */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#002B49] font-bold">
                      Kategori Koleksi Utama
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">5 Rangkaian Formulasi Laut Dalam</span>
                </div>

                {/* 5 Banners in Exact 3:2 Aspect Ratio (1500 x 1000) */}
                <div className="grid grid-cols-5 gap-3">
                  {MAIN_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.handle}
                      to={cat.to}
                      onClick={() => setCollectionsDropdownOpen(false)}
                      className="group/cat relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-slate-200/80 hover:border-[#269BA8] hover:shadow-lg transition-all duration-300 flex flex-col justify-end p-2.5 sm:p-3"
                    >
                      {/* 3:2 Banner Image */}
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover/cat:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />

                      {/* Ambient Gradient Overlay for Text Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/95 via-[#002B49]/40 to-transparent transition-opacity duration-300 group-hover/cat:from-[#002B49]" />

                      {/* Top Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#002B49] text-[8.5px] font-mono uppercase tracking-wider font-bold shadow-2xs">
                          {cat.badge}
                        </span>
                      </div>

                      {/* Bottom Content */}
                      <div className="relative z-10 flex items-end justify-between gap-1">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[11px] sm:text-xs font-semibold text-white tracking-wide leading-snug group-hover/cat:text-[#38B6CD] transition-colors truncate">
                            {cat.title}
                          </h4>
                          <span className="text-[9.5px] text-white/75 block truncate mt-0.5">
                            {cat.subtitle}
                          </span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover/cat:bg-[#269BA8] group-hover/cat:translate-x-0.5 transition-all">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* =================================================== */}
              {/* SECTION 2: PRODUK PILIHAN TERBARU                   */}
              {/* =================================================== */}
              <div className="pt-3.5 border-t border-[#E2EDF0]">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#002B49] font-bold">
                      Produk Pilihan Terbaru
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Formula Terkini</span>
                </div>

                {/* 4 Products in 4 Columns */}
                <div className="grid grid-cols-4 gap-3">
                  {RECENT_PRODUCTS.map((prod) => (
                    <Link
                      key={prod.handle}
                      to={`/products/${prod.handle}`}
                      onClick={() => setCollectionsDropdownOpen(false)}
                      className="group/prod flex items-center gap-3 p-2 rounded-xl bg-white/80 hover:bg-white border border-slate-200/60 hover:border-[#269BA8]/40 transition-all duration-200 shadow-2xs"
                    >
                      <div className="w-11 h-11 shrink-0 rounded-lg overflow-hidden bg-white border border-slate-200/70 p-0.5">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover rounded-md group-hover/prod:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[8.5px] font-mono text-[#269BA8] font-bold block truncate">
                          {prod.tag}
                        </span>
                        <h5 className="text-[11px] font-semibold text-slate-800 group-hover/prod:text-[#002B49] truncate mt-0.5">
                          {prod.shortTitle}
                        </h5>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs font-semibold text-[#002B49] font-mono">
                            {prod.price}
                          </span>
                          {prod.compareAtPrice && (
                            <span className="text-[10px] text-slate-400 line-through font-mono">
                              {prod.compareAtPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/prod:text-[#002B49] group-hover/prod:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Reassurance Bar */}
              <div className="mt-4 pt-3 border-t border-[#E2EDF0] flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 text-[#002B49] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    100% BPOM Resmi
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>Halal Certified Indonesia</span>
                  <span className="text-slate-300">•</span>
                  <span>Ulleung Deep Sea Water 1.500m</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Gratis Pengiriman Seluruh Indonesia &gt; Rp 200.000
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* MOBILE NAVIGATION DRAWER (Slide-over Off-Canvas)          */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-[#002B49]/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs sm:max-w-sm aqua-glass-panel border-r border-white/80 shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="h-16 sm:h-20 px-6 border-b border-[#E2EDF0] flex items-center justify-between shrink-0">
              <div className="flex flex-col">
                <span className="font-sans font-medium text-base tracking-[0.22em] text-[#002B49] uppercase">
                  NUMA · SKIN
                </span>
                <span className="text-[10px] tracking-[0.28em] text-[#5A6E7F] -mt-0.5">
                  ヌマスキン
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-[#002B49] transition-colors"
                aria-label="Tutup menu navigasi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Quick Search in Drawer */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch?.();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-white/80 border border-[#E2EDF0] text-slate-500 text-xs text-left"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Cari produk atau bahan aktif...</span>
              </button>

              {/* Group 1: Kategori Produk (Collapsible Accordion with 3:2 Banners) */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCategoryAccordionOpen(!mobileCategoryAccordionOpen)}
                  className="w-full flex items-center justify-between mb-2 focus:outline-hidden"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#269BA8] font-bold">
                    Kategori Produk
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      mobileCategoryAccordionOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileCategoryAccordionOpen && (
                  <nav className="flex flex-col space-y-2 text-sm animate-in fade-in duration-200">
                    {MAIN_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.handle}
                        to={cat.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group/mcat relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-slate-200 flex flex-col justify-end p-3"
                      >
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover/mcat:scale-105 transition-transform"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/90 via-[#002B49]/30 to-transparent" />
                        <div className="relative z-10 flex items-end justify-between">
                          <div>
                            <span className="font-mono text-[8px] uppercase tracking-wider text-[#38B6CD] font-bold block">
                              {cat.badge}
                            </span>
                            <span className="text-xs font-semibold text-white block mt-0.5">
                              {cat.title}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                        </div>
                      </Link>
                    ))}
                  </nav>
                )}
              </div>

              {/* Group 2: Menu Utama & Program */}
              <div className="pt-4 border-t border-[#E2EDF0]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#269BA8] font-bold block mb-2.5">
                  Menu Utama
                </span>
                <nav className="flex flex-col space-y-1 text-sm">
                  <Link
                    to="/collections/paket-hemat-bundling"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-2.5 rounded-lg hover:bg-white text-slate-800 hover:text-[#002B49] font-medium flex items-center justify-between transition-colors"
                  >
                    <span>Paket Bundling</span>
                    <span className="font-mono text-[10px] text-[#002B49] bg-[#EBF5F8] px-2 py-0.5 rounded-full font-semibold">
                      42 Pilihan Set
                    </span>
                  </Link>
                  <Link
                    to="/blogs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-2.5 rounded-lg hover:bg-white text-slate-800 hover:text-[#002B49] font-medium transition-colors"
                  >
                    Blog & Jurnal Edukasi
                  </Link>
                  <Link
                    to="/pages/science"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-2.5 rounded-lg hover:bg-white text-slate-800 hover:text-[#002B49] font-medium transition-colors"
                  >
                    Sains Ulleung Deep Sea Water
                  </Link>
                  <Link
                    to="/pages/bpom"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-2.5 rounded-lg hover:bg-white text-slate-800 hover:text-[#002B49] font-medium transition-colors"
                  >
                    Verifikasi Izin Edar BPOM RI
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-2.5 rounded-lg hover:bg-white text-slate-800 hover:text-[#002B49] font-medium transition-colors flex items-center justify-between"
                  >
                    <span>Akun Saya & Pesanan</span>
                    <User className="w-4 h-4 text-slate-400" />
                  </Link>
                </nav>
              </div>
            </div>

            {/* Drawer Footer: Reassurance */}
            <div className="p-6 bg-[#F4F9FA] border-t border-[#E2EDF0] text-center shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block">
                Terdaftar Resmi BPOM RI · Halal Indonesia
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Official Store numaskin.id
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
