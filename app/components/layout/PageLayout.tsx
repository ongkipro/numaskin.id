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
      handle: 'numa-skin-deep-sea-water-treatment-lotion',
      variantTitle: '150ml',
      price: 109000,
      quantity: 1,
      image: 'https://cdn.shopify.com/s/files/1/0826/9368/5494/files/numa-skin-deep-sea-water-treatment-lotion-150ml-01-front.webp?v=1790480108',
    },
  ]);

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
        handle: 'numa-skin-deep-sea-water-treatment-lotion',
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className={isHome ? 'hidden sm:block absolute top-0 left-0 right-0 z-50' : 'relative z-50'}>
        <AnnouncementBar />
      </div>
      
      <Header
        cartItemCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1">
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

      {/* Predictive Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#002B49]/50 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative min-h-screen sm:min-h-0 sm:max-w-2xl sm:mx-auto sm:my-16 p-4">
            <div className="bg-white/92 backdrop-blur-2xl rounded-sm border border-white/80 shadow-[0_16px_50px_rgba(0,43,73,0.15)] p-6 relative animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2EDF0]/70">
                <div className="flex items-center gap-3 flex-1 bg-[#F4F9FA]/80 backdrop-blur-xs px-3.5 py-2 rounded-xs border border-white/80">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Cari produk (misal: NAD+, toner, flek hitam, sunscreen)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 ml-2 text-slate-400 hover:text-[#002B49] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="py-4 max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                      HASIL PRODUK ({searchResults.length})
                    </span>
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.handle}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3.5 p-2.5 rounded-sm hover:bg-white/80 border border-transparent hover:border-white/90 hover:shadow-2xs transition-all"
                      >
                        <img
                          src={p.featuredImage?.url}
                          alt={p.title}
                          className="w-12 h-12 object-contain bg-white/70 backdrop-blur-xs rounded-xs border border-white/80 p-1 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-slate-900 truncate">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate">
                            {p.subtitle || p.productType}
                          </p>
                        </div>
                        <span className="font-bold text-xs text-[#002B49] font-mono whitespace-nowrap">
                          {formatRupiah(p.priceRange.minVariantPrice.amount)}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  searchQuery.trim().length > 0 && (
                    <div className="py-8 text-center text-xs text-slate-500">
                      Tidak ditemukan produk dengan kata kunci "{searchQuery}".
                    </div>
                  )
                )}

                {searchQuery.trim().length === 0 && (
                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                      PENCARIAN POPULER
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['NAD+ Booster Serum', 'Treatment Lotion 150ml', 'Paket Awet Muda', 'Adenosine', 'Sunscreen'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1 rounded-xs bg-[#EBF5F8]/80 backdrop-blur-xs border border-white/80 text-[#002B49] text-xs font-medium hover:bg-[#002B49] hover:text-white transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
