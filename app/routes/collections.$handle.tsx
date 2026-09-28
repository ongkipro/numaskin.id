import { useState, useMemo } from 'react';
import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/collections.$handle';
import * as mockCatalog from '~/lib/mock-catalog';
import { ProductCard } from '~/components/product/ProductCard';
import { SlidersHorizontal, Home } from 'lucide-react';

export const meta: Route.MetaFunction = ({ data }: { data: any }) => {
  if (!data?.collection) {
    return [{ title: 'Koleksi Tidak Ditemukan — Numa Skin' }];
  }
  return [
    { title: `${data.collection.title} — Numa Skin Official` },
    {
      name: 'description',
      content: data.collection.description || `Koleksi resmi produk ${data.collection.title} Numa Skin terdaftar BPOM.`,
    },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  if (!handle) throw new Response('Not Found', { status: 404 });

  const result = mockCatalog.getCollectionByHandle(handle);
  if (!result) {
    throw new Response('Collection Not Found', { status: 404 });
  }

  return {
    collection: result.collection,
    products: result.products,
  };
}

export default function CollectionDetailPage() {
  const { collection, products } = useLoaderData<typeof loader>();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [activeConcern, setActiveConcern] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');

  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    products.forEach((p) => {
      if (p.productType) types.add(p.productType);
    });
    return Array.from(types).sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Filter by skin concern tag
    if (activeConcern !== 'all') {
      const q = activeConcern.toLowerCase();
      list = list.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by product type
    if (activeType !== 'all') {
      list = list.filter((p) => p.productType === activeType);
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, sortBy, activeConcern, activeType]);

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-20">
      
      {/* Collection Hero Header */}
      <section className="w-full py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-panel p-8 sm:p-10 rounded-2xl shadow-xs">
            {/* Breadcrumb */}
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
                  <Link to="/collections" className="hover:text-[#002B49] transition-colors">Koleksi</Link>
                </li>
                <li aria-hidden="true" className="flex items-center">
                  <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
                </li>
                <li className="font-semibold text-slate-900 flex items-center" aria-current="page">
                  {collection.title}
                </li>
              </ol>
            </nav>

            <h1 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal leading-tight mb-3">
              {collection.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Control Bar: Filters & Sorting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-xl p-4 sm:p-5 shadow-xs mb-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Pills - Concern Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Kebutuhan:</span>
              </span>

              {[
                { id: 'all', label: 'Semua Formula' },
                { id: 'anti aging', label: 'Anti-Aging' },
                { id: 'skin barrier', label: 'Skin Barrier' },
                { id: 'brightening', label: 'Pencerah' },
                { id: 'bundling hemat', label: 'Paket Hemat' },
                { id: 'travel size', label: 'Travel Size' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveConcern(f.id)}
                  className={`px-3.5 py-1.5 !rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeConcern === f.id
                      ? 'btn-glass-primary'
                      : 'btn-glass-outline text-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 self-end md:self-auto flex-shrink-0">
              <label htmlFor="sort-select">Urutkan:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/90 backdrop-blur-xs border border-white/90 rounded-lg px-3 py-1.5 text-xs text-slate-800 shadow-2xs focus:outline-hidden focus:border-[#002B49]"
              >
                <option value="featured">Rekomendasi Utama</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
                <option value="name">Nama Produk (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Product Type Filter Pills (if more than 1 type available) */}
          {availableTypes.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 mt-3 border-t border-slate-200/50 text-xs">
              <span className="font-semibold text-slate-400 mr-1 text-[11px]">Tipe:</span>
              <button
                type="button"
                onClick={() => setActiveType('all')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                  activeType === 'all'
                    ? 'bg-[#269BA8] text-white shadow-2xs'
                    : 'bg-white/70 text-slate-600 border border-white/80 hover:bg-white'
                }`}
              >
                Semua Kategori
              </button>
              {availableTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                    activeType === t
                      ? 'bg-[#269BA8] text-white shadow-2xs'
                      : 'bg-white/70 text-slate-600 border border-white/80 hover:bg-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Product Count Metric */}
        <div className="pb-4 flex items-center justify-between text-xs text-slate-500 font-mono tracking-wider">
          <span>MENAMPILKAN {filteredAndSortedProducts.length} PRODUK FORMULA</span>
        </div>

        {/* 4-Col Desktop / 2-Col Mobile Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-2xl p-8 shadow-xs">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              Tidak ada produk yang cocok dengan filter yang dipilih.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveConcern('all');
                setActiveType('all');
              }}
              className="mt-3 text-xs font-semibold text-[#002B49] underline hover:text-[#269BA8] transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
