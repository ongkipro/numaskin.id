import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AmbassadorSpotlight() {
  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Media Column */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#F4F9FA]">
              <img
                src="/images/products/adenosine-moisturizer-with-deep-sea-water-30gr/gallery-01.jpg"
                alt="Sahrul Gunawan & Dine Pearl Brand Ambassador Numa Skin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xs border border-slate-100">
              <span className="font-mono text-[10px] text-[#0B6E7D] font-bold block uppercase tracking-wider">
                BRAND AMBASSADOR
              </span>
              <p className="text-xs font-semibold text-slate-900">
                Sahrul Gunawan & Dine Pearl
              </p>
            </div>
          </div>

          {/* Right Editorial Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#EBF5F8] text-[#0B6E7D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E7D]" />
              <span className="font-mono text-[11px] uppercase tracking-widest font-semibold">
                KAMPANYE AWET MUDA BERSAMA
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight mb-4">
              "Kerutan & Flek Hitam Berkurang Nyata dalam 14 Hari"
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              Di usia matang, kulit membutuhkan hidrasi yang mampu menembus lapisan pelindung 
              dan memberi nutrisi bagi sel-sel yang mengalami penuaan. Sahrul Gunawan dan Dine Pearl 
              memilih Numa Skin sebagai rutinitas harian karena formulanya yang ringan, cepat meresap, 
              serta terbukti secara klinis menjaga elastisitas kulit.
            </p>

            {/* Flat Checklist */}
            <div className="space-y-2.5 mb-8">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E7D] shrink-0" />
                <span>Tekstur lotion & gel cepat meresap tanpa meninggalkan rasa lengket</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E7D] shrink-0" />
                <span>Meredakan kemerahan dan mengencangkan tekstur wajah setelah 14 hari</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#0B6E7D] shrink-0" />
                <span>Diformulasikan aman untuk pria maupun wanita di segala tahapan usia</span>
              </div>
            </div>

            <Link
              to="/products/numa-skin-adenosine-deep-sea-water-moisturizer-30g"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#002B49] hover:bg-[#034266] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>Pelajari Adenosine Moisturizer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
