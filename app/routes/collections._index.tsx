import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/collections._index';
import * as mockCatalog from '~/lib/mock-catalog';
import { ArrowRight, Sparkles } from 'lucide-react';

export const meta: Route.MetaFunction = () => [
  { title: 'Direktori Koleksi — Numa Skin Official' },
  {
    name: 'description',
    content: 'Jelajahi seluruh kategori perawatan kulit Numa Skin dari pembersih, toner, serum NAD+, pelembap hingga 42 paket hemat.',
  },
];

export async function loader() {
  const collections = mockCatalog.getAllCollections();
  return { collections };
}

export default function CollectionsIndexPage() {
  const { collections } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-20">
      
      {/* Directory Header */}
      <section className="w-full py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-2xl shadow-xs">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#269BA8]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#002B49] font-semibold">
                DIREKTORI RESMI KOLEKSI NUMA SKIN
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal leading-tight mb-3">
              Koleksi Formulasi Perawatan Kulit
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Temukan rangkaian produk yang diformulasikan secara ilmiah dengan mineral Ulleung Deep Sea Water, dari hidrasi harian hingga regenerasi seluler intensif.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid with 3:2 Banners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.handle}`}
              className="group glass-card rounded-2xl overflow-hidden p-5 flex flex-col justify-between hover:border-[#269BA8]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* 3:2 Model Banner */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-slate-100 mb-4 border border-slate-200/60">
                  <img
                    src={col.image?.url || '/images/collections/collection-semua-produk-banner.webp'}
                    alt={col.image?.altText || col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/80 via-[#002B49]/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white bg-[#002B49]/80 px-2 py-0.5 rounded-full font-bold shadow-2xs">
                      Formula Laut Dalam
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] uppercase tracking-wider text-[#269BA8] font-bold block mb-1.5">
                  KOLEKSI RESMI
                </span>
                <h2 className="font-serif text-xl text-slate-900 group-hover:text-[#002B49] transition-colors mb-2">
                  {col.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {col.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[#002B49] group-hover:text-[#269BA8] transition-colors">
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
