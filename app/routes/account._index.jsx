import { Link } from 'react-router';
import { Package, Truck, CheckCircle2 } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';

export default function AccountIndexRoute() {
  const orders = [
    {
      id: 'NS-2026-8891',
      date: '26 September 2026',
      total: 406000,
      status: 'Dikirim',
      resi: 'JNT-99827162819',
      items: 'Paket Complete Routine 4-in-1 150ml (1x)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="glass-panel rounded-2xl p-6 flex items-center justify-between shadow-xs">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Sahabat Numa Skin</h2>
          <p className="text-xs text-slate-500">pelanggan@numaskin.id</p>
        </div>
        <span className="font-mono text-xs bg-white/80 border border-white/80 text-[#002B49] px-3 py-1 rounded-full font-semibold shadow-2xs">
          MEMBER TERDAFTAR
        </span>
      </div>

      {/* Orders List */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 text-[#269BA8]" />
          <span>Riwayat Pesanan Terbaru</span>
        </h3>

        <div className="divide-y divide-slate-200/60">
          {orders.map((order) => (
            <div key={order.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-[#002B49]">{order.id}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">{order.date}</span>
                </div>
                <p className="text-xs font-medium text-slate-800">{order.items}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                  <Truck className="w-3.5 h-3.5 text-[#269BA8]" />
                  <span>Resi: <strong className="font-mono text-slate-700">{order.resi}</strong></span>
                </div>
              </div>

              <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center">
                <span className="font-bold text-sm text-[#002B49] font-mono">{formatRupiah(order.total)}</span>
                <span className="text-[11px] font-semibold text-[#10B981] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{order.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
