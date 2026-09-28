import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { formatRupiah } from '~/lib/utils';

export interface CartItem {
  id: string;
  variantId: string;
  title: string;
  handle: string;
  variantTitle?: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onAddUpsell?: (handle: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 200000; // Rp 200.000

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddUpsell,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end sm:justify-start">
      {/* Backdrop Scrim */}
      <div
        className="fixed inset-0 bg-[#002B49]/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart Container: Bottom Sheet (Mobile) / Slide-over Drawer (Desktop) */}
      <div className="relative w-full max-h-[78vh] sm:max-h-full sm:h-full sm:fixed sm:inset-y-0 sm:right-0 sm:left-auto sm:max-w-md rounded-t-[32px] sm:rounded-none bg-white/92 backdrop-blur-2xl border-t sm:border-t-0 sm:border-l border-white/90 shadow-[0_-25px_60px_rgba(0,43,73,0.22)] sm:shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom duration-300 ease-out sm:slide-in-from-bottom-0 sm:slide-in-from-right overflow-hidden">
        
        {/* Top Sheet Drag Indicator Pill on Mobile */}
        <div className="pt-3 pb-1.5 flex justify-center shrink-0 sm:hidden">
          <div className="w-12 h-1.5 rounded-full bg-slate-300/80" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 sm:p-5 border-b border-[#E2EDF0]/70 flex items-center justify-between bg-white/75 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#002B49]" />
            <h2 className="text-sm sm:text-base font-semibold text-slate-900">
              Keranjang Belanja ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#002B49]/5 hover:bg-[#002B49]/10 text-slate-600 hover:text-[#002B49] flex items-center justify-center transition-colors"
            aria-label="Tutup keranjang"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 py-3 bg-[#EBF5F8]/70 backdrop-blur-md border-b border-white/80 shrink-0">
          <div className="flex items-center justify-between text-xs font-medium text-slate-800 mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span>
                Tambah <strong className="text-[#002B49]">{formatRupiah(remainingForFreeShipping)}</strong> lagi untuk <strong>GRATIS ONGKIR</strong>
              </span>
            ) : (
              <span className="text-[#002B49] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#269BA8]" />
                <span>Pesanan Anda memenuhi syarat Bebas Ongkir</span>
              </span>
            )}
            <span className="font-mono text-[11px] text-slate-500 font-bold">{shippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#269BA8] transition-all duration-300 rounded-full"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EBF5F8]/80 backdrop-blur-xs flex items-center justify-center text-[#002B49]">
                <ShoppingBag className="w-8 h-8 text-[#269BA8]" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">
                Keranjang belanja masih kosong
              </h3>
              <p className="text-xs text-slate-400 mb-5 max-w-xs mx-auto">
                Jelajahi formula perawatan kulit berbahan dasar mineral laut dalam kami.
              </p>
              <Link
                to="/collections/all-products"
                onClick={onClose}
                className="btn-glass-primary px-6 py-2.5 text-xs"
              >
                Jelajahi Produk
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3.5 p-3 rounded-xl aqua-glass-card shadow-2xs"
              >
                <img
                  src={item.image || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg'}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded-lg flex-shrink-0 bg-white p-1 border border-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                    {item.title}
                  </h4>
                  {item.variantTitle && item.variantTitle !== 'Default Title' && (
                    <p className="text-[11px] text-slate-500 mb-1">{item.variantTitle}</p>
                  )}
                  <p className="text-xs font-bold text-[#002B49] font-sans">
                    {formatRupiah(item.price)}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="inline-flex items-center border border-[#E2EDF0] rounded-lg bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                        aria-label="Kurangi jumlah"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-semibold font-mono text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                        aria-label="Tambah jumlah"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-slate-400 hover:text-[#E05368] transition-colors ml-auto cursor-pointer"
                      aria-label="Hapus item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Smart Upsell Box (Only if cart not empty) */}
          {items.length > 0 && onAddUpsell && (
            <div className="mt-4 p-3.5 bg-[#F4F9FA]/80 backdrop-blur-xs border border-white/80 rounded-xl shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#269BA8] font-semibold">
                  REKOMENDASI LENGKAP
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs">
                  <p className="font-semibold text-slate-900">Treatment Lotion 50ml (Travel)</p>
                  <p className="text-slate-500 font-mono text-[11px]">{formatRupiah(79000)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onAddUpsell('deep-sea-water-treatment-lotion')}
                  className="btn-glass-secondary px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  + Tambah
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E2EDF0]/70 bg-white/80 backdrop-blur-md space-y-3 shrink-0 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold text-[#002B49] text-base">{formatRupiah(subtotal)}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Pajak dan ongkos kirim resmi dihitung saat checkout.
            </p>

            <a
              href={
                items.length > 0
                  ? `https://y2x75f-40.myshopify.com/cart/${items
                      .map((i) => `${i.variantId.split('/').pop()}:${i.quantity}`)
                      .join(',')}`
                  : '#'
              }
              className="btn-glass-primary w-full py-3.5 text-xs sm:text-[13px] tracking-wider group cursor-pointer"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4 text-[#38B6CD] group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Transaksi 100% Aman Terenkripsi SSL</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
