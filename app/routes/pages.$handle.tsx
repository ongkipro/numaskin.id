import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/pages.$handle';
import { ShieldCheck, Droplets, CheckCircle2, MessageCircle } from 'lucide-react';

export const meta: Route.MetaFunction = ({ data }: { data: any }) => {
  if (!data) {
    return [{ title: 'Halaman Tidak Ditemukan - Numa Skin Official' }];
  }
  const title = data.seoTitle || `${data.title} - Numa Skin Official`;
  const description =
    data.seoDescription ||
    `${data.subtitle}. Informasi resmi produk perawatan kulit dan transparansi layanan toko Numa Skin Indonesia berizin BPOM RI.`;
  const canonicalUrl = `https://numaskin.id/pages/${data.handle}`;
  const image = data.image || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },

    // OpenGraph
    { property: 'og:site_name', content: 'Numa Skin Official' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  if (!handle) throw new Response('Not Found', { status: 404 });

  const pagesMap: Record<
    string,
    { title: string; subtitle: string; seoTitle: string; seoDescription: string; image?: string }
  > = {
    about: {
      title: 'Kisah & Filosofi Numa Skin',
      subtitle: 'Harmoni Tradisi Mindful J-Beauty & Eksplorasi Sains Mineral Laut Dalam',
      seoTitle: 'Kisah & Filosofi Brand Numa Skin - Japanese Marine Skincare',
      seoDescription:
        'Mengenal kisah Numa Skin: perpaduan filosofi mindful J-Beauty dan kemurnian mineral Ulleung Deep Sea Water untuk kesehatan seluler kulit wajah.',
      image: '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg',
    },
    science: {
      title: 'The Science: Ulleung Deep Sea Water & 2% NAD+',
      subtitle: 'Formulasi Klinis untuk Peremajaan DNA Seluler Kulit Wajah',
      seoTitle: 'Sains Deep Sea Water & 2% NAD+ Booster - Numa Skin Science',
      seoDescription:
        'Pelajari sains klinis Ulleung Deep Sea Water, 2% NAD+, dan Salmon PDRN dalam menstimulasi regenerasi seluler serta memperbaiki skin barrier alami.',
      image: '/images/collections/collection-anti-aging-series-banner.webp',
    },
    bpom: {
      title: 'Direktori Izin Edar Resmi BPOM RI',
      subtitle: 'Transparansi Legalitas & Jaminan Keamanan Formula 100% Terverifikasi',
      seoTitle: 'Direktori Izin Edar Resmi BPOM RI - Legalitas Produk Numa Skin',
      seoDescription:
        'Daftar lengkap nomor notifikasi BPOM RI seluruh produk resmi Numa Skin. Jaminan produk 100% legal, aman, bebas paraben, dan teruji dermatologi.',
      image: '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg',
    },
    faq: {
      title: 'Pusat Bantuan & FAQ',
      subtitle: 'Jawaban Lengkap Mengenai Keamanan, Pengiriman, dan Panduan Pemakaian',
      seoTitle: 'Pusat Bantuan & FAQ - Panduan Pemakaian & Belanja - Numa Skin',
      seoDescription:
        'Pertanyaan umum seputar produk Numa Skin, panduan urutan pemakaian, keamanan bumil dan busui, estimasi pengiriman, serta klaim garansi 14 hari.',
      image: '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg',
    },
  };

  const page = pagesMap[handle] || {
    title: handle.charAt(0).toUpperCase() + handle.slice(1).replace(/-/g, ' '),
    subtitle: 'Informasi Resmi Numa Skin Indonesia',
    seoTitle: `${handle.charAt(0).toUpperCase() + handle.slice(1).replace(/-/g, ' ')} - Informasi Resmi Numa Skin`,
    seoDescription: `Halaman informasi resmi ${handle.replace(/-/g, ' ')} toko Numa Skin Indonesia. Layanan produk perawatan kulit terdaftar resmi BPOM RI.`,
  };

  return { handle, ...page };
}

export default function GenericPage() {
  const { handle, title, subtitle } = useLoaderData<typeof loader>();

  let pageSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: subtitle,
    url: `https://numaskin.id/pages/${handle}`,
    publisher: {
      '@type': 'Organization',
      name: 'Numa Skin Official',
      url: 'https://numaskin.id',
    },
  };

  if (handle === 'about') {
    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Kisah & Filosofi Numa Skin',
      description: 'Harmoni Tradisi Mindful J-Beauty & Eksplorasi Sains Mineral Laut Dalam',
      url: 'https://numaskin.id/pages/about',
      mainEntity: {
        '@type': 'Organization',
        name: 'Numa Skin',
        url: 'https://numaskin.id',
        logo: 'https://numaskin.id/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg',
      },
    };
  } else if (handle === 'faq') {
    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Apakah seluruh produk Numa Skin sudah terdaftar resmi di BPOM?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ya, seluruh formula produk Numa Skin 100% telah memiliki izin edar resmi dan nomor notifikasi aktif dari Badan Pengawas Obat dan Makanan (BPOM) Republik Indonesia.',
          },
        },
        {
          '@type': 'Question',
          name: 'Apakah produk Numa Skin aman untuk ibu hamil dan menyusui (bumil & busui friendly)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Formula Numa Skin bebas dari paraben, alkohol agresif, dan bahan kimia berbahaya sehingga ramah untuk kulit sensitif, ibu hamil, maupun ibu menyusui.',
          },
        },
        {
          '@type': 'Question',
          name: 'Berapa lama estimasi pengiriman dan bagaimana syarat Gratis Ongkir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pesanan diproses dalam 1x24 jam hari kerja. Gratis Ongkir berlaku ke seluruh Indonesia dengan minimum belanja Rp 200.000.',
          },
        },
      ],
    };
  }

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      
      {/* Page Header */}
      <section className="w-full py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-2xl shadow-xs">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#002B49]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#002B49] font-semibold">
                INFORMASI RESMI NUMA SKIN
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal mb-3">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-6 sm:p-10 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
          
          {handle === 'about' && (
            <div className="space-y-6 text-slate-700">
              <h2 className="font-serif text-xl sm:text-2xl text-slate-900">Perjalanan Menemukan Rahasia Awet Muda</h2>
              <p>
                Numa Skin (ヌマスキン) didirikan atas sebuah keyakinan sederhana: <em>peremajaan kulit tidak harus mengorbankan kekuatan skin barrier</em>. Banyak formula anti-aging di pasaran menggunakan bahan agresif yang menyebabkan iritasi, kemerahan, atau rasa kering tertarik.
              </p>
              <p>
                Melalui riset bioteknologi dermatologis dan inspirasi ritual perawatan kulit Jepang yang menghormati keseimbangan alami kulit, Numa Skin memformulasikan rangkaian perawatan dengan basis <strong>Ulleung Island Deep Sea Water</strong>—air laut dalam yang murni, bebas kontaminasi mikroplastik, serta kaya akan mineral bio-kompatibel.
              </p>
              <div className="p-5 bg-white/70 backdrop-blur-xs border border-[#269BA8]/20 rounded-xl">
                <strong className="block text-slate-900 mb-1 font-semibold">Kampanye Kesadaran Kulit Awet Muda</strong>
                Bersama figur publik Sahrul Gunawan dan Dine Pearl, Numa Skin mengkampanyekan pentingnya merawat kesehatan kulit sejak dini agar setiap orang dapat tampil percaya diri dan sehat di setiap tahapan hidup.
              </div>
            </div>
          )}

          {handle === 'science' && (
            <div className="space-y-6 text-slate-700">
              <h2 className="font-serif text-xl sm:text-2xl text-slate-900">Kemurnian Laut Dalam Pulau Ulleung</h2>
              <p>
                Air laut dalam Pulau Ulleung diambil pada kedalaman lebih dari 200 meter, di mana sinar matahari tidak dapat menembus dan suhu air tetap stabil di kisaran 1–2°C. Kondisi ini menjaga konsentrasi mineral esensial seperti <strong>Magnesium, Kalsium, Kalium, dan Zinc</strong> tetap utuh tanpa kontaminasi.
              </p>
              <h3 className="font-serif text-lg text-slate-900 pt-4">Bioteknologi 2% NAD+ Cellular Rejuvenation</h3>
              <p>
                NAD+ (Nicotinamide Adenine Dinucleotide) adalah koenzim krusial yang terdapat pada seluruh sel hidup. Seiring bertambahnya usia, kadar NAD+ dalam tubuh menurun drastis, menyebabkan regenerasi sel melambat dan timbulnya kerutan serta flek hitam. Numa Skin memformulasikan konsentrasi 2% NAD+ yang stabil untuk membantu memicu kembali energi perbaikan DNA seluler kulit.
              </p>
            </div>
          )}

          {handle === 'bpom' && (
            <div className="space-y-6 text-slate-700">
              <h2 className="font-serif text-xl sm:text-2xl text-slate-900">Daftar Nomor Izin Edar Resmi Badan POM RI</h2>
              <p>
                Seluruh produk Numa Skin yang dipasarkan secara resmi telah melalui uji laboratorium ketat dan memiliki Nomor Izin Edar resmi dari Badan POM RI:
              </p>
              <div className="overflow-x-auto rounded-xl border border-white/80 shadow-2xs">
                <table className="w-full text-left text-xs bg-white/60">
                  <thead className="bg-white/80 text-slate-900 font-semibold border-b border-slate-200/80">
                    <tr>
                      <th className="p-3">Nama Produk</th>
                      <th className="p-3">Netto</th>
                      <th className="p-3">Nomor Registrasi BPOM</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    <tr>
                      <td className="p-3 font-medium">Deep Sea Water Facial Wash Gel</td>
                      <td className="p-3 font-mono">100 ml</td>
                      <td className="p-3 font-mono font-bold text-[#002B49]">NA18241203644</td>
                      <td className="p-3 text-[#10B981] font-semibold">Resmi / Aktif</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Deep Sea Water Treatment Lotion Full Size</td>
                      <td className="p-3 font-mono">150 ml</td>
                      <td className="p-3 font-mono font-bold text-[#002B49]">NA18220101675</td>
                      <td className="p-3 text-[#10B981] font-semibold">Resmi / Aktif</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Deep Sea Water Treatment Lotion Travel</td>
                      <td className="p-3 font-mono">50 ml</td>
                      <td className="p-3 font-mono font-bold text-[#002B49]">NA18220101675</td>
                      <td className="p-3 text-[#10B981] font-semibold">Resmi / Aktif</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Adenosine Deep Sea Water Moisturizer</td>
                      <td className="p-3 font-mono">30 g</td>
                      <td className="p-3 font-mono font-bold text-[#002B49]">NA18230107871</td>
                      <td className="p-3 text-[#10B981] font-semibold">Resmi / Aktif</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Calming Barrier Gloss Gel Moisturizer</td>
                      <td className="p-3 font-mono">30 ml</td>
                      <td className="p-3 font-mono font-bold text-[#002B49]">NA18230100779</td>
                      <td className="p-3 text-[#10B981] font-semibold">Resmi / Aktif</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">PDRN Alpha Arbutin Tone-Up Day Cream</td>
                      <td className="p-3 font-mono">30 g</td>
                      <td className="p-3 font-mono font-bold text-[#002B49]">NA18240107890</td>
                      <td className="p-3 text-[#10B981] font-semibold">Resmi / Aktif</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Oxydew Sunscreen Luceane SPF 50+ PA++++</td>
                      <td className="p-3 font-mono">30 ml</td>
                      <td className="p-3 font-mono font-bold text-[#002B49]">NA18241700684</td>
                      <td className="p-3 text-[#10B981] font-semibold">Resmi / Aktif</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">NAD+ Booster Anti-Aging Serum</td>
                      <td className="p-3 font-mono">20 ml</td>
                      <td className="p-3 font-mono font-bold text-[#002B49]">NA18242000231</td>
                      <td className="p-3 text-[#10B981] font-semibold">Resmi / Aktif</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {handle === 'faq' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-slate-900 mb-4">Butuh Bantuan Lebih Lanjut?</h2>
              <p>
                Tim Customer Care & Beauty Advisor kami siap membantu menjawab seputar rekomendasi produk, konfirmasi pesanan, maupun panduan penggunaan:
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Numa%20Skin,%20saya%20mau%20bertanya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#269BA8] hover:bg-[#38B6CD] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi Beauty Advisor</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
