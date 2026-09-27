import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Apakah produk Numa Skin sudah terdaftar resmi di BPOM?',
    a: 'Ya, seluruh produk resmi Numa Skin sudah lolos uji dan memiliki nomor notifikasi resmi dari BPOM RI yang tertera pada kemasan dan detail produk.',
  },
  {
    q: 'Apakah aman untuk ibu hamil dan menyusui?',
    a: 'Produk dasar seperti Facial Wash, Treatment Lotion, dan Gloss Gel Moisturizer diformulasikan lembut tanpa paraben dan tanpa alkohol sehingga aman. Untuk serum dengan bahan aktif tinggi, disarankan konsultasi terlebih dahulu dengan dokter Anda.',
  },
  {
    q: 'Apa keunggulan air laut dalam untuk kulit?',
    a: 'Air laut dalam kaya akan mineral alami seperti magnesium dan kalsium yang membantu mengunci hidrasi lebih tahan lama dan menjaga kesehatan skin barrier.',
  },
  {
    q: 'Berapa lama estimasi pengiriman pesanan?',
    a: 'Pesanan diproses setiap hari kerja. Estimasi pengiriman untuk area Jabodetabek berkisar 1–3 hari kerja, dan 2–5 hari kerja untuk luar pulau Jawa.',
  },
];

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full py-16 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
            Pertanyaan Umum
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Informasi seputar produk, izin BPOM, dan pengiriman pesanan.
          </p>
        </div>

        {/* Flat Minimalist Accordions (No Boxed Cards) */}
        <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-4 sm:py-5">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left font-medium text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 transition-colors hover:text-[#0B6E7D]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#0B6E7D]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
