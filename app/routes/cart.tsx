import { Link } from 'react-router';
import type { Route } from './+types/cart';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';

export const meta: Route.MetaFunction = () => [
  { title: 'Keranjang Belanja Anda - Pesanan Skincare Resmi - Numa Skin' },
  {
    name: 'description',
    content:
      'Lihat ringkasan keranjang belanja produk Numa Skin. Dapatkan promo gratis ongkir ke seluruh Indonesia untuk belanja minimal Rp 200.000.',
  },
  { name: 'robots', content: 'noindex, follow' },
  { tagName: 'link', rel: 'canonical', href: 'https://numaskin.id/cart' },
];

export default function CartPage() {
  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen py-16 sm:py-24 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center w-full">
        <div className="glass-panel p-8 sm:p-12 rounded-2xl shadow-xs">
          <div className="w-16 h-16 rounded-full bg-white/80 border border-white/80 mx-auto mb-5 flex items-center justify-center text-[#002B49] shadow-xs">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-slate-900 mb-2">
            Keranjang Belanja Anda
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
            Nikmati <strong>Gratis Ongkir</strong> ke seluruh Indonesia untuk pesanan di atas Rp 200.000 dengan jaminan produk asli terdaftar BPOM.
          </p>

          <div className="bg-white/60 border border-white/80 rounded-xl p-6 sm:p-8 text-center space-y-4 mb-6">
            <p className="text-xs text-slate-600">
              Gunakan laci keranjang interaktif di sudut kanan atas untuk mengelola item atau langsung lanjutkan ke pembayaran resmi.
            </p>
            <div className="pt-2">
              <Link
                to="/collections/all"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#002B49] hover:bg-[#00385F] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Jelajahi Formula Numa Skin</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Checkout Resmi Shopify Terenkripsi SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
