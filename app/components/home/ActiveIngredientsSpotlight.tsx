import { Droplets, Dna, Shield, Activity } from 'lucide-react';

const ACTIVES = [
  {
    icon: Droplets,
    name: 'Ulleung Island Deep Sea Water',
    tag: 'DEEP OCEAN MINERALS',
    description: 'Diambil dari kedalaman laut pulau vulkanik Ulleung. Mengandung magnesium, kalsium, dan kalium organik yang meniru mineral alami tubuh untuk hidrasi tanpa rasa lengket.',
  },
  {
    icon: Dna,
    name: '2% NAD+ Booster',
    tag: 'CELLULAR LONGEVITY',
    description: 'Koenzim vital seluler yang menurun seiring usia. Membantu memberi energi pada sel kulit, merangsang pembaruan alami, serta memudarkan flek hitam penuaan.',
  },
  {
    icon: Activity,
    name: 'Adenosine & Phytosqualane',
    tag: 'FIRMING & ELASTICITY',
    description: 'Senyawa anti-aging teruji dermatologis yang bekerja mengunci kelembapan hingga lapisan terdalam, merawat elastisitas kontur wajah, dan memudarkan garis halus.',
  },
  {
    icon: Shield,
    name: 'Salmon PDRN & Alpha Arbutin',
    tag: 'TONE-UP & CELL REPAIR',
    description: 'Molekul bioteknologi Salmon DNA (PDRN) yang bekerja sinergis dengan Alpha Arbutin untuk meregenerasi jaringan kulit kusam dan memberikan efek cerah alami seketika.',
  },
];

export function ActiveIngredientsSpotlight() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8FCFD] border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#EBF5F8] text-[#0B6E7D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E7D]" />
            <span className="font-mono text-[11px] uppercase tracking-widest font-semibold">
              DERMATOLOGICAL SCIENCE
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
            Sains Laut Dalam & Bioaktif Seluler
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
            Kemurnian mineral alami dari laut dalam dipadukan dengan bioaktif regenerasi seluler teruji klinis.
          </p>
        </div>

        {/* 4 Actives Grid (Flat Minimalist Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACTIVES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-100/90 hover:border-[#38B6CD]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#EBF5F8] text-[#0B6E7D] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#0B6E7D]" />
                  </div>

                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#0B6E7D] block mb-1">
                    {item.tag}
                  </span>

                  <h3 className="font-medium text-base text-slate-900 mb-2 leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 text-[10px] font-mono text-slate-400">
                  STANDARDISASI BPOM RI
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
