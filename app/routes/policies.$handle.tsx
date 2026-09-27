import { useLoaderData, Link } from 'react-router';
import { Home } from 'lucide-react';
import type { Route } from './+types/policies.$handle';

export const meta: Route.MetaFunction = ({ data }: { data: any }) => [
  { title: `${data?.policy?.title || 'Kebijakan Toko'} — Numa Skin Official` },
];

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  if (!handle) throw new Response('Policy handle required', { status: 400 });

  const defaultPolicies: Record<string, { title: string; body: string }> = {
    'refund-policy': {
      title: 'Kebijakan Pengembalian & Garansi 14 Hari',
      body: '<p>Numa Skin berkomitmen memberikan produk perawatan kulit berkualitas tinggi. Jika Anda mengalami reaksi ketidakcocokan atau produk rusak saat diterima, Anda dapat mengajukan klaim garansi dalam waktu 14 hari sejak barang diterima dengan melampirkan video unboxing dan bukti pembelian resmi.</p>',
    },
    'shipping-policy': {
      title: 'Kebijakan Pengiriman & Gratis Ongkir',
      body: '<p>Semua pesanan diproses dalam 1x24 jam pada hari kerja. Kami menyediakan Gratis Ongkir ke seluruh wilayah Indonesia untuk pesanan di atas Rp 200.000 dengan kurir terpercaya dan nomor resi otomatis.</p>',
    },
    'privacy-policy': {
      title: 'Kebijakan Privasi',
      body: '<p>Numa Skin menjaga kerahasiaan data pribadi pelanggan dengan standar keamanan tertinggi. Informasi kontak, alamat pengiriman, dan riwayat pesanan digunakan semata-mata untuk kelancaran transaksi belanja Anda.</p>',
    },
    'terms-of-service': {
      title: 'Syarat & Ketentuan Layanan',
      body: '<p>Dengan berbelanja di numaskin.id, Anda menyetujui seluruh ketentuan layanan resmi dan kebijakan transaksi yang berlaku di wilayah hukum Republik Indonesia.</p>',
    },
  };

  const policy = defaultPolicies[handle] || {
    title: 'Kebijakan Toko',
    body: '<p>Kebijakan resmi Numa Skin Indonesia.</p>',
  };

  return { policy };
}

export default function PolicyRoute() {
  const { policy } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-20">
      <section className="w-full py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="glass-panel p-8 sm:p-12 rounded-2xl shadow-xs">
            <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-4 inline-block">
              <ol className="flex items-center gap-2.5 justify-center">
                <li className="flex items-center">
                  <Link to="/" className="hover:text-[#002B49] transition-colors flex items-center gap-1" title="Beranda" aria-label="Beranda">
                    <Home className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </li>
                <li aria-hidden="true" className="flex items-center">
                  <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
                </li>
                <li className="flex items-center">
                  <Link to="/policies" className="hover:text-[#002B49] transition-colors">Kebijakan</Link>
                </li>
                <li aria-hidden="true" className="flex items-center">
                  <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
                </li>
                <li className="font-semibold text-slate-900 flex items-center" aria-current="page">
                  {policy.title}
                </li>
              </ol>
            </nav>
            <h1 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal">
              {policy.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="glass-panel rounded-2xl p-6 sm:p-10 shadow-xs prose prose-slate text-xs sm:text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: policy.body }}
        />
      </div>
    </div>
  );
}
