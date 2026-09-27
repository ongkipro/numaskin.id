import { useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import type { Route } from './+types/products.$handle';
import * as mockCatalog from '~/lib/mock-catalog';
import { formatRupiah, calculateDiscount, cleanVariantTitle } from '~/lib/utils';
import { StickyMobileCTA } from '~/components/product/StickyMobileCTA';
import { ShieldCheck, CheckCircle2, ChevronDown, ShoppingBag, ArrowRight, Home } from 'lucide-react';

export const meta: Route.MetaFunction = ({ data }: { data: any }) => {
  if (!data?.product) {
    return [{ title: 'Produk Tidak Ditemukan — Numa Skin' }];
  }
  const title = data.product.seoTitle || `${data.product.title} — Numa Skin Official`;
  const description = data.product.seoDescription || data.product.description || `${data.product.title} formula resmi Numa Skin terdaftar BPOM RI.`;
  const image = data.product.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';

  return [
    { title: `${title} | Numa Skin` },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:type', content: 'product' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  if (!handle) throw new Response('Not Found', { status: 404 });

  const product = mockCatalog.getProductByHandle(handle);
  if (!product) {
    throw new Response('Product Not Found', { status: 404 });
  }

  // Get matching routine recommendations
  const allSingles = mockCatalog.getFeaturedSingles();
  const upsellProduct = allSingles.find((p) => p.handle !== handle) || allSingles[0];

  return { product, upsellProduct };
}

export default function ProductDetailPage() {
  const { product, upsellProduct } = useLoaderData<typeof loader>();

  const variants = product.variants?.nodes || [];
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = variants[selectedVariantIndex] || variants[0];

  const images = product.images?.nodes || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const currentImage = images[selectedImageIndex]?.url || product.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';

  // State for routine upsell checkbox
  const [includeUpsell, setIncludeUpsell] = useState(false);

  // Accordion tabs
  const [activeTab, setActiveTab] = useState<'benefits' | 'actives' | 'usage' | 'bpom'>('benefits');

  const currentPrice = selectedVariant?.price?.amount
    ? parseFloat(selectedVariant.price.amount)
    : parseFloat(product.priceRange.minVariantPrice.amount);

  const compareAtPrice = selectedVariant?.compareAtPrice?.amount
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : (product.compareAtPriceRange?.minVariantPrice.amount ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) : null);

  const discountPercent = compareAtPrice ? calculateDiscount(currentPrice, compareAtPrice) : 0;

  const upsellPrice = upsellProduct ? parseFloat(upsellProduct.priceRange.minVariantPrice.amount) : 0;
  const totalPrice = includeUpsell ? currentPrice + upsellPrice : currentPrice;

  const variantNumericId = selectedVariant?.id ? selectedVariant.id.split('/').pop() : '';
  const upsellNumericId = (includeUpsell && upsellProduct?.variants?.nodes?.[0]?.id)
    ? upsellProduct.variants.nodes[0].id.split('/').pop()
    : null;
  const directCheckoutUrl = upsellNumericId
    ? `https://y2x75f-40.myshopify.com/cart/${variantNumericId}:1,${upsellNumericId}:1`
    : `https://y2x75f-40.myshopify.com/cart/${variantNumericId}:1`;

  return (
    <div className="w-full bg-ocean-ambient pb-24 sm:pb-28 min-h-screen relative overflow-hidden">
      {/* Ambient Sea Blur */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#38B6CD]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#269BA8]/10 blur-3xl pointer-events-none" />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-xs text-slate-500 relative z-10">
        <ol className="flex items-center gap-2 flex-wrap glass-pill px-3.5 py-1.5 rounded-xs inline-flex shadow-2xs font-mono">
          <li className="flex items-center">
            <Link to="/" className="hover:text-[#002B49] flex items-center gap-1 transition-colors" title="Beranda" aria-label="Beranda">
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </li>
          <li aria-hidden="true" className="flex items-center">
            <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
          </li>
          <li className="flex items-center">
            <Link to={`/collections/${product.collections[0] || 'all'}`} className="hover:text-[#002B49]">
              {product.productType || 'Produk'}
            </Link>
          </li>
          <li aria-hidden="true" className="flex items-center">
            <span className="w-1 h-1 rounded-full bg-slate-300 inline-block" />
          </li>
          <li className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs flex items-center" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Main Split Layout: 55% Media / 45% Purchase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column (55% on Desktop): Media Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-28 space-y-4">
              
              {/* Primary Active Image (Glass Panel) */}
              <div className="aspect-square w-full rounded-sm glass-panel border border-white/85 overflow-hidden flex items-center justify-center p-6 relative shadow-md">
                {discountPercent > 0 && (
                  <span className="absolute top-4 left-4 z-10 bg-[#002B49] text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded-xs shadow-2xs">
                    HEMAT {discountPercent}%
                  </span>
                )}
                <img
                  src={currentImage}
                  alt={images[selectedImageIndex]?.altText || product.title}
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                />
              </div>

              {/* Shot Label & Navigation Indicator */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1 py-0.5">
                <span className="truncate text-slate-600">
                  {images[selectedImageIndex]?.altText || product.title}
                </span>
                {images.length > 1 && (
                  <span className="flex-shrink-0 ml-2 font-bold text-[#002B49] bg-white/80 border border-white/80 px-2 py-0.5 rounded-full shadow-2xs">
                    {selectedImageIndex + 1} / {images.length}
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 sm:w-18 sm:h-18 rounded-xl border p-1 bg-white/80 flex-shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#002B49] ring-2 ring-[#002B49] shadow-xs'
                          : 'border-white/80 opacity-75 hover:opacity-100 hover:border-slate-300'
                      }`}
                      aria-label={`Lihat gambar ${idx + 1}`}
                    >
                      <img
                        src={img.url}
                        alt={img.altText || `${product.title} ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* 14-Day Clinical Guarantee Box (Glass Panel) */}
              <div className="p-4 rounded-sm glass-panel border border-white/85 flex items-start gap-3 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-[#269BA8] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900 block font-semibold mb-0.5">
                    Garansi Resmi Kulit Lembap & Kencang 14 Hari
                  </strong>
                  Uji klinis membuktikan hidrasi menembus lapisan pelindung kulit tanpa memicu iritasi. 
                  100% Terdaftar BPOM RI dan Halal Indonesia.
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (45% on Desktop): Purchase Suite (Frosted Glass Panel) */}
          <div className="lg:col-span-5 flex flex-col justify-start glass-panel rounded-sm p-6 sm:p-8 border border-white/85 shadow-lg">
            
            {/* BPOM Tag & Netto */}
            <div className="flex items-center gap-2 mb-2 font-mono text-xs">
              <span className="text-[#269BA8] font-bold uppercase tracking-wider">
                {product.bpom ? `BPOM: ${product.bpom}` : 'RESMI BPOM RI'}
              </span>
              {product.netto && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{product.netto}</span>
                </>
              )}
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-2xl sm:text-3xl text-slate-900 font-normal leading-tight mb-2">
              {product.title}
            </h1>

            {/* Subtitle / Key Claim */}
            {product.subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {product.subtitle}
              </p>
            )}

            {/* Pricing Suite (Frosted Glass Card) */}
            <div className="flex items-baseline gap-3 p-4 rounded-sm glass-card mb-6 border border-white/80">
              <span className="text-2xl sm:text-3xl font-bold text-[#002B49] font-sans">
                {formatRupiah(currentPrice)}
              </span>
              {compareAtPrice && compareAtPrice > currentPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatRupiah(compareAtPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="font-mono text-xs bg-[#E05368] text-white font-bold px-2 py-0.5 rounded-xs ml-auto shadow-2xs">
                  HEMAT {discountPercent}%
                </span>
              )}
            </div>

            {/* Variant Selector (if multiple variants exist) */}
            {variants.length > 1 && (
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-700 font-semibold block mb-2">
                  PILIHAN UKURAN / VARIAN:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {variants.map((v, vIdx) => {
                    const cleanTitle = cleanVariantTitle(v.title) || `Pilihan ${vIdx + 1}`;
                    const isSelected = selectedVariantIndex === vIdx;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantIndex(vIdx)}
                        className={`px-4 py-2.5 rounded-xs text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-[#002B49] text-white border-[#002B49] shadow-xs'
                            : 'bg-white/80 text-slate-800 border-white/80 hover:border-slate-400'
                        }`}
                      >
                        {cleanTitle}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Frequently Bought Together / Routine Upsell Checkbox */}
            {upsellProduct && (
              <div className="mb-6 p-4 rounded-sm glass-pill border border-[#269BA8]/30 shadow-2xs">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeUpsell}
                    onChange={(e) => setIncludeUpsell(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded-xs text-[#002B49] focus:ring-[#002B49]"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block">
                      Lengkapi Rutinitas dengan: {upsellProduct.title}
                    </span>
                    <span className="text-slate-600 block mt-0.5">
                      Tambahkan dengan harga spesial: <strong className="text-[#002B49] font-mono">{formatRupiah(upsellPrice)}</strong>
                    </span>
                  </div>
                </label>
              </div>
            )}

            {/* CTAs Action Buttons */}
            <div className="space-y-3 mb-8">
              <a
                href={directCheckoutUrl}
                className="w-full py-3.5 rounded-xs bg-[#002B49] hover:bg-[#081B2B] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Beli Sekarang · {formatRupiah(totalPrice)}</span>
              </a>

              <a
                href={directCheckoutUrl}
                className="w-full py-3.5 rounded-xs border border-[#002B49] text-[#002B49] hover:bg-[#002B49] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Direct Checkout Instan</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Accordion Tabs Specification */}
            <div className="border-t border-[#E2EDF0]/70 pt-6 space-y-3">
              
              {/* Tab 1: Manfaat & Khasiat */}
              <div className="glass-card rounded-sm overflow-hidden border border-white/80 transition-all">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'benefits' ? ('' as any) : 'benefits')}
                  className="w-full p-3.5 text-left font-semibold text-xs text-slate-900 flex items-center justify-between hover:bg-white/80 transition-colors"
                >
                  <span>Manfaat Utama & Hasil Perawatan</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'benefits' ? 'rotate-180 text-[#002B49]' : ''}`} />
                </button>
                {activeTab === 'benefits' && (
                  <div className="p-4 bg-white/50 backdrop-blur-xs border-t border-[#E2EDF0]/70 text-xs text-slate-600 leading-relaxed space-y-2">
                    <p>• Menghidrasi kulit hingga lapisan terdalam tanpa rasa lengket atau berminyak.</p>
                    <p>• Menjaga kekuatan skin barrier dan meredakan kemerahan pada kulit sensitif.</p>
                    <p>• Mengembalikan elastisitas kontur wajah dan memudarkan garis halus penuaan.</p>
                  </div>
                )}
              </div>

              {/* Tab 2: Kandungan Aktif */}
              <div className="glass-card rounded-sm overflow-hidden border border-white/80 transition-all">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'actives' ? ('' as any) : 'actives')}
                  className="w-full p-3.5 text-left font-semibold text-xs text-slate-900 flex items-center justify-between hover:bg-white/80 transition-colors"
                >
                  <span>Kandungan Aktif & Bioaktif Laut</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'actives' ? 'rotate-180 text-[#002B49]' : ''}`} />
                </button>
                {activeTab === 'actives' && (
                  <div className="p-4 bg-white/50 backdrop-blur-xs border-t border-[#E2EDF0]/70 text-xs text-slate-600 leading-relaxed space-y-2">
                    <p><strong>Ulleung Deep Sea Water:</strong> Kaya magnesium, kalsium, dan kalium alami.</p>
                    <p><strong>2% NAD+ Cellular Booster:</strong> Merangsang energi perbaikan seluler.</p>
                    <p><strong>Adenosine & Niacinamide:</strong> Mencerahkan dan merawat kekencangan kulit.</p>
                  </div>
                )}
              </div>

              {/* Tab 3: Cara Penggunaan */}
              <div className="glass-card rounded-sm overflow-hidden border border-white/80 transition-all">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'usage' ? ('' as any) : 'usage')}
                  className="w-full p-3.5 text-left font-semibold text-xs text-slate-900 flex items-center justify-between hover:bg-white/80 transition-colors"
                >
                  <span>Cara Penggunaan Ritual Harian</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'usage' ? 'rotate-180 text-[#002B49]' : ''}`} />
                </button>
                {activeTab === 'usage' && (
                  <div className="p-4 bg-white/50 backdrop-blur-xs border-t border-[#E2EDF0]/70 text-xs text-slate-600 leading-relaxed space-y-2">
                    <p>1. Bersihkan wajah terlebih dahulu dengan Deep Sea Water Facial Wash Gel.</p>
                    <p>2. Tuangkan 3–5 tetes produk pada telapak tangan bersih.</p>
                    <p>3. Tepuk-tepuk lembut ke seluruh permukaan wajah dan leher hingga meresap sempurna.</p>
                    <p>4. Gunakan secara teratur pada pagi dan malam hari sebelum pelembap.</p>
                  </div>
                )}
              </div>

              {/* Tab 4: Legalitas BPOM & Keamanan */}
              <div className="glass-card rounded-sm overflow-hidden border border-white/80 transition-all">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'bpom' ? ('' as any) : 'bpom')}
                  className="w-full p-3.5 text-left font-semibold text-xs text-slate-900 flex items-center justify-between hover:bg-white/80 transition-colors"
                >
                  <span>Legalitas Izin Edar BPOM RI & Keamanan</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'bpom' ? 'rotate-180 text-[#002B49]' : ''}`} />
                </button>
                {activeTab === 'bpom' && (
                  <div className="p-4 bg-white/50 backdrop-blur-xs border-t border-[#E2EDF0]/70 text-xs text-slate-600 leading-relaxed space-y-2">
                    <p><strong>Nomor Registrasi BPOM:</strong> {product.bpom || 'NA18220101675'}</p>
                    <p><strong>Status Halal:</strong> Bersertifikat Halal Indonesia</p>
                    <p><strong>Formulasi:</strong> 0% Alkohol, Bebas Paraben, Bebas Pewangi Buatan, Aman untuk Kulit Sensitif.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Mobile Sticky Add to Cart Bar */}
      <StickyMobileCTA
        product={product}
        selectedPrice={currentPrice}
        onAddToCart={() => {
          if (typeof window !== 'undefined') {
            window.location.href = directCheckoutUrl;
          }
        }}
      />

    </div>
  );
}
