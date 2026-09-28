import { useState } from 'react';
import { ChevronDown, CheckCircle2, Droplets, Clock, ShieldCheck } from 'lucide-react';
import type { Product } from '~/lib/mock-catalog';

interface ProductAccordionsProps {
  product: Product;
}

export function ProductAccordions({ product }: ProductAccordionsProps) {
  const [openTab, setOpenTab] = useState<string | null>('benefits');

  const toggleTab = (id: string) => {
    setOpenTab((prev) => (prev === id ? null : id));
  };

  const tabs = [
    {
      id: 'benefits',
      title: 'Manfaat Utama & Hasil Perawatan',
      icon: CheckCircle2,
      content: (
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8] mt-1.5 flex-shrink-0" />
            <span>Menghidrasi kulit hingga lapisan terdalam tanpa rasa lengket atau berminyak berkat partikel molekul mikro Ulleung Island Deep Sea Water.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8] mt-1.5 flex-shrink-0" />
            <span>Memperkuat dan memperbaiki skin barrier yang rusak, meredakan kemerahan, serta mencegah hilangnya kelembapan alami (*Transepidermal Water Loss*).</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8] mt-1.5 flex-shrink-0" />
            <span>Mengembalikan elastisitas kontur wajah, memudarkan flek hitam, serta menghaluskan garis-garis halus penuaan dalam 14 hari pemakaian teratur.</span>
          </p>
        </div>
      ),
    },
    {
      id: 'actives',
      title: 'Kandungan Aktif & Bioaktif Laut',
      icon: Droplets,
      content: (
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
          <div className="p-3 rounded-xl bg-white/60 border border-white/80">
            <strong className="text-[#002B49] block font-semibold mb-0.5">Ulleung Island Deep Sea Water</strong>
            <p>Air laut dalam pulau Ulleung yang diambil dari kedalaman lebih dari 200 meter, kaya mineral murni (Magnesium, Kalsium, Kalium) dengan rasio mineral selaras cairan tubuh manusia.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/60 border border-white/80">
            <strong className="text-[#002B49] block font-semibold mb-0.5">2% NAD+ Cellular Booster & Salmon PDRN</strong>
            <p>Koenzim vital pembentukan energi seluler kulit yang dipadukan Polydeoxyribonucleotide DNA Salmon murni untuk regenerasi jaringan sel yang menua.</p>
          </div>
          <div className="p-3 rounded-xl bg-white/60 border border-white/80">
            <strong className="text-[#002B49] block font-semibold mb-0.5">Adenosine, Squalane & Niacinamide</strong>
            <p>Mencegah degradasi kolagen alami, mengunci kelembapan di lapisan epidermis, dan mencerahkan warna kulit secara merata.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'usage',
      title: 'Cara Penggunaan Ritual Harian',
      icon: Clock,
      content: (
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
          <p className="flex items-start gap-2">
            <span className="font-mono font-bold text-[#0B6E7D]">01.</span>
            <span>Bersihkan wajah secara menyeluruh dengan Deep Sea Water Facial Wash Gel, bilas dengan air suam-suam kuku.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-mono font-bold text-[#0B6E7D]">02.</span>
            <span>Aplikasikan Deep Sea Water Treatment Lotion untuk menyeimbangkan pH dan membuka pori-pori kulit.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-mono font-bold text-[#0B6E7D]">03.</span>
            <span>Tuangkan 3–5 tetes serum secara merata, tepuk-tepuk lembut ke seluruh permukaan wajah dan leher hingga meresap.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-mono font-bold text-[#0B6E7D]">04.</span>
            <span>Kunci dengan Moisturizer pada pagi/malam, dan aplikasikan Tabir Surya Oxydew SPF 50+ pada pagi hari.</span>
          </p>
        </div>
      ),
    },
    {
      id: 'bpom',
      title: 'Legalitas Izin Edar BPOM RI & Keamanan',
      icon: ShieldCheck,
      content: (
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
          <p>
            <strong className="text-[#002B49]">Nomor Izin Edar BPOM:</strong>{' '}
            <span className="font-mono text-[#0B6E7D] font-bold">{product.bpom || 'NA18220101675'}</span>
          </p>
          <p>
            <strong className="text-[#002B49]">Sertifikasi Halal:</strong> Terdaftar resmi Halal Indonesia (BPJPH).
          </p>
          <p>
            <strong className="text-[#002B49]">Standar Keamanan Formulasi:</strong> 0% Alkohol, 0% Paraben, Bebas Pewangi Sintetis, Teruji Dermatologi (*Dermatologically Tested*), Aman untuk Ibu Hamil & Menyusui.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/85 divide-y divide-[#E2EDF0]/80 overflow-hidden shadow-none">
      {tabs.map((tab) => {
        const isOpen = openTab === tab.id;
        const Icon = tab.icon;

        return (
          <div key={tab.id} className="transition-colors duration-200">
            <button
              type="button"
              onClick={() => toggleTab(tab.id)}
              className="w-full p-4 sm:py-4.5 sm:px-5 text-left font-semibold text-xs sm:text-[13px] text-[#002B49] flex items-center justify-between hover:bg-white/50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EBF5F8] text-[#0B6E7D] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#269BA8]" />
                </div>
                <span>{tab.title}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#0B6E7D] transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#002B49]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 bg-white/35 backdrop-blur-xs">
                {tab.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
