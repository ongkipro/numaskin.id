import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AmbassadorSpotlight() {
  return (
    <section className="w-full py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          
          {/* Left Media Column (Seamless Organic Blend, No Hard Box, Pure Mist Fade) */}
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-transparent">
            {/* Luminous Glow Behind Model */}
            <div className="absolute inset-0 bg-radial from-[#38B6CD]/10 via-[#269BA8]/5 to-transparent blur-2xl pointer-events-none" />
            
            <img
              src="/images/ambassador/numa-skin-ambassador-single-hijab-aqua.webp"
              alt="Numa Skin Deep Sea Water Glowing Skin Model"
              loading="lazy"
              className="w-full h-full object-cover [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_98%)] transform-gpu transition-transform duration-700 ease-out hover:scale-103"
            />
          </div>

          {/* Right Editorial Column (Singkat, Jelas, Padat ala Shopify) */}
          <div className="flex flex-col items-start">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0B6E7D] font-semibold mb-1">
              KAMPANYE AWET MUDA BERSAMA
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#002B49] tracking-tight leading-tight mb-2">
              Kerutan & Flek Berkurang Nyata dalam 14 Hari
            </h2>

            {/* Luminous Aqua Glass Accent */}
            <div className="mb-4 flex items-center gap-1.5">
              <div className="h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#269BA8] via-[#38B6CD] to-[#269BA8] shadow-[0_0_12px_rgba(38,155,168,0.5)] border border-white/60 backdrop-blur-xs" />
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-[#269BA8]/40 to-transparent" />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal max-w-lg">
              Sahrul Gunawan dan Dine Pearl mempercayakan rutinitas harian pada Numa Skin untuk menjaga hidrasi seluler, elastisitas, dan keremajaan kulit usia matang.
            </p>

            {/* Concise Clinical Bullet Highlights */}
            <div className="space-y-2 mb-6 w-full">
              <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#269BA8] shrink-0" />
                <span>Garis halus & flek tersamarkan nyata dalam 14 hari</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#269BA8] shrink-0" />
                <span>Tekstur lotion & gel cepat meresap tanpa lengket</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#269BA8] shrink-0" />
                <span>Formula seimbang & teruji klinis untuk pria & wanita</span>
              </div>
            </div>

            <Link
              to="/products/numa-skin-adenosine-deep-sea-water-moisturizer-30g"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xs bg-[#002B49] hover:bg-[#0B6E7D] text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-colors shadow-xs group"
            >
              <span>Pelajari Rangkaian Pilihan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#38B6CD]" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
