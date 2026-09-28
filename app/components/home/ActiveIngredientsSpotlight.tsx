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

        {/* 4 Actives Grid (Frameless Frosted Glass, Center Aligned, Pure Minimalist Elegance) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {ACTIVES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl bg-white/65 hover:bg-white/95 backdrop-blur-md border border-white/80 hover:border-white transition-all duration-300 flex flex-col items-center text-center justify-between group shadow-none"
              >
                <div className="flex flex-col items-center w-full">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5F8] text-[#0B6E7D] flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#0B6E7D]" />
                  </div>

                  <span className="font-mono text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-wider text-[#0B6E7D] block mb-1.5">
                    {item.tag}
                  </span>

                  <div className="h-9 sm:h-10 flex items-center justify-center mb-2 w-full">
                    <h3 className="font-sans font-semibold text-xs sm:text-sm text-[#002B49] leading-snug line-clamp-2">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-[10.5px] sm:text-[12px] text-slate-500 leading-relaxed font-sans max-w-[240px]">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-200/50 w-full flex items-center justify-center gap-2 text-[8.5px] sm:text-[9.5px] font-mono text-slate-400 uppercase tracking-wider">
                  <span>BPOM RI</span>
                  <span className="text-slate-300">•</span>
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
