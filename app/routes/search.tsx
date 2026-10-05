import { useLoaderData, Form } from 'react-router';
import type { Route } from './+types/search';
import * as mockCatalog from '~/lib/mock-catalog';
import { ProductCard } from '~/components/product/ProductCard';
import { Search } from 'lucide-react';

export const meta: Route.MetaFunction = () => [
  { title: 'Pencarian Produk Skincare Resmi BPOM - Numa Skin Official' },
  {
    name: 'description',
    content:
      'Cari formula perawatan kulit Numa Skin sesuai kebutuhan Anda: pembersih gentle, hydrating toner, serum NAD+, pelembap, hingga paket hemat.',
  },
  { name: 'robots', content: 'noindex, follow' },
  { tagName: 'link', rel: 'canonical', href: 'https://numaskin.id/search' },
];

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  
  // Strict clamping invariant: Math.min(10, Math.max(1, limit))
  const results = mockCatalog.predictiveSearch(query, 10);

  return {
    query,
    products: results.products,
  };
}

export default function SearchPage() {
  const { query, products } = useLoaderData<typeof loader>();

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-20">
      
      {/* Search Header */}
      <section className="w-full py-12 sm:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="glass-panel p-8 sm:p-12 rounded-2xl shadow-xs">
            <h1 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal mb-4">
              Pencarian Produk
            </h1>

            <Form method="get" className="relative max-w-lg mx-auto">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Cari formula (misal: NAD+, toner, flek hitam)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/80 bg-white/80 backdrop-blur-xs text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#002B49] focus:bg-white shadow-2xs transition-all"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            </Form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-xl px-4 py-3 shadow-xs mb-6 flex items-center justify-between text-xs text-slate-600 font-mono tracking-wider">
          <span>
            {query.trim().length > 0
              ? `HASIL UNTUK "${query}": ${products.length} FORMULA`
              : 'REKOMENDASI FORMULA UTAMA'}
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-2xl p-8 shadow-xs">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              Tidak ditemukan formula dengan kata kunci "{query}".
            </p>
            <p className="text-xs text-slate-500">
              Coba kata kunci lain seperti "toner", "serum", "adenosine", atau "paket".
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
