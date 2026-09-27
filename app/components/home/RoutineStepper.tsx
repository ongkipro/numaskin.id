import { Link } from 'react-router';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { formatRupiah } from '~/lib/utils';
import type { Product } from '~/lib/mock-catalog';

interface RoutineStepperProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onAddBundle?: (handle: string) => void;
}

const STEPS = [
  {
    step: '01',
    phase: 'BERSIHKAN',
    role: 'Pembersih Pori Lembut',
    handle: 'numa-skin-deep-sea-water-facial-wash-100ml',
    activeHighlight: '5% Niacinamide & Deep Sea Water',
    description: 'Busa halus non-stripping membersihkan pori tanpa rasa tertarik.',
  },
  {
    step: '02',
    phase: 'HIDRASI',
    role: 'Hydrating Toner & Essence',
    handle: 'numa-skin-deep-sea-water-treatment-lotion',
    activeHighlight: 'Ulleung Island Deep Sea Water',
    description: 'Menembus lapisan terdalam kulit untuk mengunci kadar air & pH balance.',
  },
  {
    step: '03',
    phase: 'NUTRISI',
    role: 'Cellular Longevity Serum',
    handle: 'numa-skin-nad-booster-anti-aging-serum-20ml',
    activeHighlight: '2% NAD+ & 4X Peptide Complex',
    description: 'Konsentrat peremajaan seluler untuk menyamarkan kerutan & mencerahkan.',
  },
  {
    step: '04',
    phase: 'KUNCI & LINDUNGI',
    role: 'Anti-Aging Moisturizer',
    handle: 'numa-skin-adenosine-deep-sea-water-moisturizer-30g',
    activeHighlight: 'Adenosine & Phytosqualane',
    description: 'Mengunci nutrisi, mengencangkan kontur wajah & menjaga elastisitas.',
  },
];

export function RoutineStepper({ products, onAddToCart, onAddBundle }: RoutineStepperProps) {
  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#EBF5F8] text-[#0B6E7D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E7D]" />
            <span className="font-mono text-[11px] uppercase tracking-widest font-semibold">
              THE 4-STEP RITUAL
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
            Rangkaian Sinergis Awet Muda 4 Langkah
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Setiap formula dirancang bekerja selaras: dari membersihkan pori secara lembut, 
            menghidrasi mendalam dengan mineral laut, hingga mengunci peremajaan seluler kulit.
          </p>
        </div>

        {/* 4 Steps Grid (Flat Minimalist) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {STEPS.map((s, idx) => {
            const matchedProduct = products.find((p) => p.handle === s.handle) || products[idx];
            const imageUrl = matchedProduct?.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';
            const price = matchedProduct ? parseFloat(matchedProduct.priceRange.minVariantPrice.amount) : 79000;

            return (
              <div
                key={s.step}
                className="relative rounded-xl p-5 bg-[#F8FCFD] hover:bg-[#F0F8FA] transition-all flex flex-col justify-between border border-slate-100/90 group"
              >
                {/* Large Ghost Numeral Watermark */}
                <span className="absolute -top-2 -right-1 font-mono text-5xl font-bold text-slate-900/5 select-none pointer-events-none">
                  {s.step}
                </span>

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-3 z-10 relative">
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[#0B6E7D]">
                      STEP {s.step} · {s.phase}
                    </span>
                  </div>

                  {/* Thumbnail (Frameless) */}
                  <div className="aspect-square w-full rounded-sm overflow-hidden mb-3 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={matchedProduct?.title || s.role}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain rounded-sm group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-medium text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 mb-1">
                    {matchedProduct?.title || s.role}
                  </h3>

                  <p className="font-mono text-[11px] font-medium text-[#0B6E7D] mb-2">
                    {s.activeHighlight}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {s.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-bold text-sm text-[#002B49] font-sans">
                    {formatRupiah(price)}
                  </span>

                  <Link
                    to={`/products/${s.handle}`}
                    className="text-xs font-semibold text-[#002B49] hover:text-[#0B6E7D] flex items-center gap-1 transition-colors"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 1-Click Routine Bundle Deal (Flat Minimalist Banner) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#EBF5F8] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#0B6E7D] font-bold block mb-1">
              PAKET RUTINITAS 4-IN-1
            </span>
            <h3 className="text-lg sm:text-xl font-serif text-slate-900">
              Hasil Maksimal dalam 1 Paket Lengkap
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Beli rangkaian 4 produk sekaligus (Facial Wash, Toner 150ml, NAD+ Serum, Moisturizer) 
              dan hemat hingga <strong>Rp 122.750</strong> dibanding pembelian satuan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-center sm:text-right">
              <span className="block text-xs text-slate-400 line-through">Rp 528.750</span>
              <span className="block text-xl sm:text-2xl font-bold text-[#002B49] font-sans">
                Rp 406.000
              </span>
              <span className="font-mono text-[10px] text-[#0B6E7D] font-bold">HEMAT 23%</span>
            </div>

            <Link
              to="/products/numa-skin-paket-complete-routine-4-in-1-150ml"
              className="px-6 py-3.5 rounded-full bg-[#002B49] hover:bg-[#034266] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli Paket 4-in-1</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
