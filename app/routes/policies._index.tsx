import { Link } from 'react-router';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function PoliciesIndexPage() {
  const policies = [
    { handle: 'shipping-policy', title: 'Kebijakan Pengiriman & Gratis Ongkir', desc: 'Ketentuan gratis ongkir, estimasi waktu tiba, dan asuransi pengiriman.' },
    { handle: 'refund-policy', title: 'Kebijakan Pengembalian & Garansi 14 Hari', desc: 'Prosedur klaim garansi produk dan pengembalian dana.' },
    { handle: 'privacy-policy', title: 'Kebijakan Privasi', desc: 'Perlindungan kerahasiaan data pembeli dan enkripsi transaksi.' },
    { handle: 'terms-of-service', title: 'Syarat & Ketentuan', desc: 'Aturan hukum dan penggunaan situs resmi numaskin.id.' },
  ];

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-20">
      <section className="w-full py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="glass-panel p-8 sm:p-12 rounded-2xl shadow-xs">
            <h1 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal mb-2">
              Kebijakan Resmi Toko
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Transparansi layanan, jaminan keamanan transaksi, dan perlindungan konsumen.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {policies.map((p) => (
            <Link
              key={p.handle}
              to={`/policies/${p.handle}`}
              className="p-6 glass-card rounded-2xl hover:border-[#002B49]/40 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-[#002B49] mb-1.5 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {p.desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#002B49] group-hover:text-[#269BA8] transition-colors">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
