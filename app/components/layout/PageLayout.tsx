import { useState, useEffect } from 'react';
import { AnnouncementBar } from '~/components/layout/AnnouncementBar';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import { CartDrawer, type CartItem } from '~/components/cart/CartDrawer';
import { Search, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { predictiveSearch, type Product } from '~/lib/mock-catalog';
import { formatRupiah } from '~/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard shortcut: Cmd+K / Ctrl+K to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);
  
  // Local cart state for mock/dummy engine
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      variantId: 'gid://shopify/ProductVariant/51752141291766',
      title: 'Numa Skin Deep Sea Water Treatment Lotion',
      handle: 'deep-sea-water-treatment-lotion',
      variantTitle: '150ml',
      price: 109000,
      quantity: 1,
      image: 'https://cdn.shopify.com/s/files/1/0826/9368/5494/files/numa-skin-deep-sea-water-treatment-lotion-150ml-01-front.webp?v=1790480108',
    },
  ]);

  // Global event listener for Add to Cart
  useEffect(() => {
    const handleAddToCartEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ item: CartItem }>;
      if (customEvent.detail?.item) {
        const newItem = customEvent.detail.item;
        setCartItems((prev) => {
          const existing = prev.find((i) => i.variantId === newItem.variantId);
          if (existing) {
            return prev.map((i) =>
              i.variantId === newItem.variantId
                ? { ...i, quantity: i.quantity + newItem.quantity }
                : i
            );
          }
          return [...prev, newItem];
        });
        setIsCartOpen(true);
      }
    };

    window.addEventListener('numa:add-to-cart', handleAddToCartEvent);
    return () => window.removeEventListener('numa:add-to-cart', handleAddToCartEvent);
  }, []);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddUpsell = (handle: string) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `cart-${Date.now()}`,
        variantId: 'gid://shopify/ProductVariant/51752141258998',
        title: 'Numa Skin Deep Sea Water Treatment Lotion',
        handle: 'deep-sea-water-treatment-lotion',
        variantTitle: '50ml',
        price: 79000,
        quantity: 1,
        image: 'https://cdn.shopify.com/s/files/1/0826/9368/5494/files/numa-skin-deep-sea-water-treatment-lotion-150ml-01-front.webp?v=1790480108',
      },
    ]);
  };

  const searchResults = searchQuery.trim().length > 0 ? predictiveSearch(searchQuery, 6).products : [];

  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProduct = location.pathname.startsWith('/products/');
  const isTransparentHeroPage = isHome || isProduct;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Announcement Bar: Scrolls away with page (NOT sticky) */}
      <div className={isTransparentHeroPage ? 'hidden sm:block absolute top-0 left-0 right-0 z-50' : 'relative z-50'}>
        <AnnouncementBar />
      </div>
      
      {/* Header: Transparent on home hero, sticky glass on scroll & subpages */}
      <Header
        cartItemCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 relative">
        {children}
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddUpsell={handleAddUpsell}
      />

      {/* Predictive Search: Bottom Sheet on Mobile, Floating Modal on Desktop */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end sm:justify-start sm:p-4">
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-[#002B49]/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsSearchOpen(false)}
            aria-hidden="true"
          />

          {/* Search Container: Bottom Sheet (Mobile) / Centered Floating Card (Desktop) */}
          <div className="relative w-full sm:max-w-2xl sm:mx-auto sm:my-16 max-h-[88vh] sm:max-h-[80vh] rounded-t-[28px] sm:rounded-2xl bg-white/95 backdrop-blur-2xl border-t sm:border border-white/90 shadow-[0_-20px_60px_rgba(0,43,73,0.18)] sm:shadow-[0_20px_60px_rgba(0,43,73,0.18)] flex flex-col z-50 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 overflow-hidden">
            
            {/* Top Drag Indicator for Mobile */}
            <div className="pt-3 pb-1 flex justify-center shrink-0 sm:hidden">
              <div className="w-12 h-1.5 rounded-full bg-slate-300/80" />
            </div>

            {/* Search Header Bar */}
            <div className="px-5 py-3 sm:p-5 border-b border-[#E2EDF0]/70 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3 flex-1 bg-[#EBF5F8]/70 border border-white/90 rounded-full px-4 py-2.5 shadow-inner">
                <Search className="w-4 h-4 text-[#0B6E7D] shrink-0" />
                <input
                  type="text"
                  placeholder="Cari produk (misal: NAD+, toner, flek, sunscreen)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-base sm:text-sm text-[#002B49] placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                />
                {searchQuery.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-[#002B49] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-full bg-[#002B49]/5 hover:bg-[#002B49]/10 text-slate-600 hover:text-[#002B49] flex items-center justify-center transition-colors shrink-0"
                aria-label="Tutup pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Results Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {searchResults.length > 0 ? (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#269BA8] font-bold block mb-2 px-1">
                    HASIL PENCARIAN ({searchResults.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.handle}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#EBF5F8]/60 border border-transparent hover:border-white/90 transition-all group"
                      >
                        <img
                          src={p.featuredImage?.url}
                          alt={p.title}
                          className="w-12 h-12 object-contain bg-white rounded-lg border border-slate-100 p-1 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#002B49] truncate group-hover:text-[#0B6E7D] transition-colors">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            {p.subtitle || p.productType}
                          </p>
                        </div>
                        <span className="font-bold text-xs text-[#0B6E7D] font-mono whitespace-nowrap">
                          {formatRupiah(p.priceRange.minVariantPrice.amount)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                searchQuery.trim().length > 0 && (
                  <div className="py-12 text-center text-xs text-slate-500">
                    <p className="font-medium text-slate-700 mb-1">
                      Tidak ditemukan produk dengan kata kunci "{searchQuery}"
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Coba cari dengan kata kunci lain seperti: toner, serum, atau pelembap.
                    </p>
                  </div>
                )
              )}

              {searchQuery.trim().length === 0 && (
                <div className="pt-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#269BA8] font-bold block mb-2.5 px-1">
                    PENCARIAN POPULER
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'NAD+ Booster Serum',
                      'Treatment Lotion',
                      'Paket Awet Muda',
                      'Adenosine Moisturizer',
                      'Oxydew Sunscreen',
                      'PDRN Day Cream',
                      'Deep Sea Water Facial Wash',
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 rounded-full bg-[#EBF5F8]/80 border border-white/80 text-[#002B49] text-xs font-medium hover:bg-[#002B49] hover:text-white transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Safe Area Padding for Mobile */}
            <div className="h-4 sm:hidden pb-[env(safe-area-inset-bottom,0px)]" />
          </div>
        </div>
      )}

    </div>
  );
}
