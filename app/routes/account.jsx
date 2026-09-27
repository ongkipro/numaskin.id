import { Link, Outlet } from 'react-router';

export const meta = () => [
  { title: 'Akun Pelanggan — Numa Skin Official' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export async function loader() {
  return {
    customer: {
      firstName: 'Sahabat',
      lastName: 'Numa Skin',
      email: 'pelanggan@numaskin.id',
      ordersCount: 1,
    },
  };
}

export default function AccountLayout() {
  return (
    <div className="w-full min-h-[70vh] bg-[#F4F9FA] bg-ocean-ambient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Account Header */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#269BA8] font-bold block mb-1">
              PORTAL PELANGGAN RESMI
            </span>
            <h1 className="font-serif text-3xl text-slate-900 font-normal">
              Akun Saya
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Kelola status pesanan, pelacakan nomor resi, dan riwayat transaksi Numa Skin.
            </p>
          </div>

          <Link
            to="/collections/all"
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#002B49] text-white hover:bg-[#00385F] transition-colors self-start sm:self-auto shadow-xs"
          >
            Lanjut Belanja
          </Link>
        </div>

        <Outlet />

      </div>
    </div>
  );
}
