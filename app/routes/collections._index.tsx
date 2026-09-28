import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/collections._index';
import * as mockCatalog from '~/lib/mock-catalog';
import { ArrowRight } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  const title = 'Katalog Koleksi Skincare Lengkap - Perawatan Kulit Alami - Numa Skin';
  const description =
    'Jelajahi seluruh kategori perawatan kulit Numa Skin dari pembersih, hydrating toner, serum NAD+, pelembap hingga 42 paket hemat berizin BPOM.';
  const canonicalUrl = 'https://numaskin.id/collections';
  const image = 'https://cdn.shopify.com/s/files/1/0826/9368/5494/collections/collection-semua-produk-banner.webp?v=1790485361';

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },

    // OpenGraph
    { property: 'og:site_name', content: 'Numa Skin Official' },
    { property: 'og:type', content: 'website' },
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

export async function loader() {
  const collections = mockCatalog
    .getAllCollections()
    .filter((c) => c.handle !== 'frontpage');
  return { collections };
}

export default function CollectionsIndexPage() {
  const { collections } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-24">
      
      {/* Directory Header (Frameless Editorial) */}
      <section className="w-full pt-28 sm:pt-36 pb-8 sm:pb-12 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Minimal Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 inline-block select-none">
            <ol className="flex items-center gap-1.5 sm:gap-2 justify-center font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
              <li>
                <Link to="/" className="hover:text-[#002B49] transition-colors">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#269BA8]/50">
                /
              </li>
              <li className="font-semibold text-[#002B49]" aria-current="page">
                Koleksi
              </li>
            </ol>
          </nav>

          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0B6E7D] font-semibold block mb-2">
            DIREKTORI RESMI KOLEKSI
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#002B49] font-normal leading-tight tracking-[0.02em] mb-3">
            Koleksi Formulasi Perawatan Kulit
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-sans">
            Temukan rangkaian produk yang diformulasikan secara ilmiah dengan mineral Ulleung Deep Sea Water, dari hidrasi harian hingga regenerasi seluler intensif.
          </p>
        </div>
      </section>

      {/* Collections Grid with 3:2 Banners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col, idx) => (
            <Link
              key={col.id}
              to={`/collections/${col.handle}`}
              className="group bg-white/70 hover:bg-white rounded-2xl overflow-hidden p-5 flex flex-col justify-between border border-slate-200/80 hover:border-[#269BA8]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* 3:2 Model Banner */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-slate-100 mb-4">
                  <img
                    src={col.image?.url || '/images/collections/collection-semua-produk-banner.webp'}
                    alt={col.image?.altText || col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={idx < 3 ? 'eager' : 'lazy'}
                    fetchPriority={idx < 3 ? 'high' : 'low'}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/80 via-[#002B49]/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white bg-[#002B49]/80 px-2 py-0.5 rounded-full font-bold shadow-2xs">
                      Formula Laut Dalam
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B6E7D] font-bold block mb-1.5">
                  KOLEKSI RESMI
                </span>
                <h2 className="font-serif text-xl text-slate-900 group-hover:text-[#002B49] transition-colors mb-2">
                  {col.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {col.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#002B49] group-hover:text-[#269BA8] transition-colors">
                <span>Jelajahi Koleksi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
