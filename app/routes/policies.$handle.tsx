import { useLoaderData, Link } from 'react-router';
import { Home } from 'lucide-react';
import type { Route } from './+types/policies.$handle';

export const meta: Route.MetaFunction = ({ data }: { data: any }) => {
  if (!data?.policy) {
    return [{ title: 'Kebijakan Tidak Ditemukan - Numa Skin Official' }];
  }
  const { policy, handle } = data;
  const title = policy.seoTitle || `${policy.title} - Numa Skin Official`;
  const description =
    policy.seoDescription ||
    `Informasi resmi ${policy.title} toko online Numa Skin Indonesia. Jaminan kenyamanan dan transparansi layanan konsumen berizin resmi BPOM RI.`;
  const canonicalUrl = `https://numaskin.id/policies/${handle}`;

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { property: 'og:site_name', content: 'Numa Skin Official' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  if (!handle) throw new Response('Policy handle required', { status: 400 });

  const defaultPolicies: Record<
    string,
    { title: string; body: string; seoTitle: string; seoDescription: string }
  > = {
    'refund-policy': {
      title: 'Kebijakan Pengembalian & Garansi 14 Hari',
      seoTitle: 'Kebijakan Pengembalian & Garansi 14 Hari - Numa Skin Official',
      seoDescription:
        'Prosedur klaim garansi produk 14 hari dan pengembalian dana di toko resmi Numa Skin. Jaminan kenyamanan belanja dengan syarat dan ketentuan transparan.',
      body: '<p>Numa Skin berkomitmen memberikan produk perawatan kulit berkualitas tinggi. Jika Anda mengalami reaksi ketidakcocokan atau produk rusak saat diterima, Anda dapat mengajukan klaim garansi dalam waktu 14 hari sejak barang diterima dengan melampirkan video unboxing dan bukti pembelian resmi.</p>',
    },
    'shipping-policy': {
      title: 'Kebijakan Pengiriman & Gratis Ongkir',
      seoTitle: 'Kebijakan Pengiriman & Gratis Ongkir - Numa Skin Official',
      seoDescription:
        'Informasi ketentuan pengiriman produk Numa Skin: proses pesanan 1x24 jam, gratis ongkir ke seluruh Indonesia, dan nomor resi pengiriman otomatis.',
      body: '<p>Semua pesanan diproses dalam 1x24 jam pada hari kerja. Kami menyediakan Gratis Ongkir ke seluruh wilayah Indonesia untuk pesanan di atas Rp 200.000 dengan kurir terpercaya dan nomor resi otomatis.</p>',
    },
    'privacy-policy': {
      title: 'Kebijakan Privasi',
      seoTitle: 'Kebijakan Privasi Perlindungan Data - Numa Skin Official',
      seoDescription:
        'Kebijakan privasi Numa Skin dalam melindungi kerahasiaan data pembeli, keamanan transaksi elektronik, dan standar perlindungan informasi pribadi.',
      body: '<p>Numa Skin menjaga kerahasiaan data pribadi pelanggan dengan standar keamanan tertinggi. Informasi kontak, alamat pengiriman, dan riwayat pesanan digunakan semata-mata untuk kelancaran transaksi belanja Anda.</p>',
    },
    'terms-of-service': {
      title: 'Syarat & Ketentuan Layanan',
      seoTitle: 'Syarat & Ketentuan Layanan Belanja - Numa Skin Official',
      seoDescription:
        'Syarat dan ketentuan resmi penggunaan situs dan transaksi belanja online di numaskin.id sesuai peraturan hukum niaga Republik Indonesia.',
      body: '<p>Dengan berbelanja di numaskin.id, Anda menyetujui seluruh ketentuan layanan resmi dan kebijakan transaksi yang berlaku di wilayah hukum Republik Indonesia.</p>',
    },
  };

  const policy = defaultPolicies[handle] || {
    title: 'Kebijakan Toko',
    seoTitle: `${handle.replace(/-/g, ' ')} - Numa Skin Official`,
    seoDescription: `Informasi kebijakan resmi ${handle.replace(/-/g, ' ')} toko Numa Skin Indonesia. Jaminan transparansi belanja terpercaya.`,
    body: '<p>Kebijakan resmi Numa Skin Indonesia.</p>',
  };

  return { policy, handle };
}

export default function PolicyRoute() {
  const { policy, handle } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-20">
      {/* Schema.org WebPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: policy.title,
            description: policy.seoDescription,
            url: `https://numaskin.id/policies/${handle}`,
            publisher: {
              '@type': 'Organization',
              name: 'Numa Skin Official',
              url: 'https://numaskin.id',
            },
          }),
        }}
      />
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
