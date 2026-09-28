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
      title: 'Manfaat',
      icon: CheckCircle2,
      content: (
        <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed font-sans">
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8] mt-1.5 flex-shrink-0" />
            <span>Menghidrasi intensif hingga lapisan terdalam tanpa rasa lengket.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8] mt-1.5 flex-shrink-0" />
            <span>Memperkuat skin barrier yang rusak dan meredakan kemerahan alami.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#269BA8] mt-1.5 flex-shrink-0" />
            <span>Mengembalikan elastisitas kulit dan menyamarkan garis halus penuaan.</span>
          </p>
        </div>
      ),
    },
    {
      id: 'actives',
      title: 'Kandungan Aktif',
      icon: Droplets,
      content: (
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
          <div>
            <span className="text-[#002B49] font-semibold">Ulleung Deep Sea Water: </span>
            <span>Kaya mineral murni mikro untuk menjaga keseimbangan hidrasi seluler.</span>
          </div>
          <div>
            <span className="text-[#002B49] font-semibold">NAD+ & Salmon PDRN: </span>
            <span>Mendukung regenerasi seluler dan meningkatkan elastisitas jaringan kulit.</span>
          </div>
          <div>
            <span className="text-[#002B49] font-semibold">Adenosine & Niacinamide: </span>
            <span>Mengunci kelembapan, meratakan warna kulit, dan memperkuat barrier.</span>
          </div>
        </div>
      ),
    },
    {
      id: 'usage',
      title: 'Cara Pakai',
      icon: Clock,
      content: (
        <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed font-sans">
          <p className="flex items-start gap-2">
            <span className="font-mono font-bold text-[#0B6E7D]">1.</span>
            <span>Tuang secukupnya pada telapak tangan atau kapas lembut.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-mono font-bold text-[#0B6E7D]">2.</span>
            <span>Usapkan dan tepuk lembut ke seluruh permukaan wajah dan leher hingga meresap.</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="font-mono font-bold text-[#0B6E7D]">3.</span>
            <span>Gunakan pagi dan malam hari setelah membersihkan wajah.</span>
          </p>
        </div>
      ),
    },
    {
      id: 'bpom',
      title: 'BPOM & Keamanan',
      icon: ShieldCheck,
      content: (
        <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed font-sans">
          <p className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Nomor BPOM:</span>
            <span className="font-mono font-bold text-[#0B6E7D]">{product.bpom || 'NA18220101675'}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Sertifikasi:</span>
            <span className="font-semibold text-slate-700">Halal Indonesia (BPJPH)</span>
          </p>
          <p>
            <span className="text-slate-400 font-medium">Standar: </span>
            <span>0% Alkohol, 0% Paraben, Bebas Pewangi Sintetis, Dermatologically Tested, Aman untuk Bumil & Busui.</span>
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
