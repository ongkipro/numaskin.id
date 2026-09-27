import { useLoaderData, Link } from 'react-router';
import { ArrowLeft, CheckCircle2, Package, Truck } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';

export async function loader({ params }) {
  return {
    order: {
      id: params.id || 'NS-2026-8891',
      date: '26 September 2026',
      status: 'Dikirim',
      resi: 'JNT-99827162819',
      total: 406000,
      subtotal: 406000,
      shipping: 0,
      lineItems: [
        {
          title: 'Numa Skin Paket Complete Routine 4-in-1 150ml',
          quantity: 1,
          price: 406000,
          image: '/images/seo/numa-skin-deep-sea-water-treatment-lotion-150ml-01-front.webp',
        },
      ],
    },
  };
}

export default function OrderDetailRoute() {
  const { order } = useLoaderData();

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
        <div>
          <Link to="/account" className="text-xs text-[#002B49] hover:text-[#269BA8] flex items-center gap-1 mb-2 font-medium transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Riwayat Pesanan</span>
          </Link>
          <h2 className="text-lg font-bold text-slate-900 font-mono">
            Pesanan #{order.id}
          </h2>
          <span className="text-xs text-slate-500">Tanggal: {order.date}</span>
        </div>

        <span className="font-mono text-xs bg-white/80 border border-white/80 text-[#10B981] px-3 py-1 rounded-full font-semibold flex items-center gap-1 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{order.status}</span>
        </span>
      </div>

      <div className="space-y-4">
        {order.lineItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 py-2">
            <img src={item.image} alt={item.title} className="w-14 h-14 object-cover border border-white/80 bg-white/80 rounded-xl p-1 shadow-2xs" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-slate-900 truncate">{item.title}</h4>
              <span className="text-xs text-slate-500">Jumlah: {item.quantity}</span>
            </div>
            <span className="font-bold text-xs text-[#002B49] font-mono">{formatRupiah(item.price)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200/60 pt-4 space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-mono">{formatRupiah(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Ongkos Kirim (Gratis Ongkir)</span>
          <span className="font-mono text-[#10B981]">Rp 0</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200/60">
          <span>Total Pembayaran</span>
          <span className="font-mono text-[#002B49]">{formatRupiah(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
