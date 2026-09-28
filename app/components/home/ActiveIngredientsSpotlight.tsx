import { Droplets, Dna, Shield, Activity } from 'lucide-react';

const ACTIVES = [
  {
    icon: Droplets,
    name: 'Ulleung Island Deep Sea Water',
    tag: 'DEEP OCEAN MINERALS',
    description: 'Mineral alami laut dalam untuk hidrasi mendalam dan memperkuat skin barrier tanpa rasa lengket.',
  },
  {
    icon: Dna,
    name: '2% NAD+ Booster',
    tag: 'CELLULAR LONGEVITY',
    description: 'Koenzim vital untuk memicu energi seluler kulit, regenerasi alami, dan menyamarkan flek penuaan.',
  },
  {
    icon: Shield,
    name: 'Salmon PDRN & Alpha Arbutin',
    tag: 'TONE-UP & CELL REPAIR',
    description: 'Sinergi DNA Salmon & Alpha Arbutin untuk meregenerasi jaringan sel dan mencerahkan kulit kusam.',
  },
  {
    icon: Activity,
    name: 'Adenosine & Phytosqualane',
    tag: 'FIRMING & ELASTICITY',
    description: 'Senyawa bioaktif pengunci kelembapan untuk menjaga elastisitas kontur wajah dan menyamarkan kerutan.',
  },
];

export function ActiveIngredientsSpotlight() {
  return (
    <section className="w-full py-14 sm:py-20 bg-[#F8FCFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Minimalist Luxury Presentation with Aqua Glass Underline) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 flex flex-col items-center">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0B6E7D] font-semibold mb-1">
            DERMATOLOGICAL SCIENCE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#002B49] tracking-tight uppercase font-normal">
            Sains Laut Dalam & Bioaktif Seluler
          </h2>

          {/* Luminous Aqua Glass Underline */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#269BA8]/40" />
            <div className="h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#269BA8] via-[#38B6CD] to-[#269BA8] shadow-[0_0_12px_rgba(38,155,168,0.5)] border border-white/60 backdrop-blur-xs" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#269BA8]/40" />
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
            Kemurnian mineral alami laut dalam dipadukan dengan bioaktif regenerasi seluler teruji klinis.
          </p>
        </div>

        {/* 4 Actives Grid (Clean 4-Col Desktop / 2-Col Mobile, Rounded Tipis) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
          {ACTIVES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-5 rounded-sm bg-white border border-slate-200/80 hover:border-[#269BA8]/40 shadow-[0_4px_16px_rgba(0,43,73,0.04)] hover:shadow-[0_12px_28px_-6px_rgba(0,43,73,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xs bg-[#EBF5F8] text-[#0B6E7D] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-[#0B6E7D]" />
                  </div>

                  <span className="font-mono text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-[#0B6E7D] block mb-1">
                    {item.tag}
                  </span>

                  <div className="h-8 sm:h-9 flex items-center mb-1.5">
                    <h3 className="font-sans font-semibold text-xs sm:text-sm text-[#002B49] leading-snug line-clamp-2">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-[10px] sm:text-[11.5px] text-slate-500 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                  <span>BPOM RI</span>
                  <span className="text-[#0B6E7D] font-medium">Teruji Klinis</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
