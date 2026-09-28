import { ShieldCheck, Droplets, CheckCircle2, HeartHandshake } from 'lucide-react';

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'BPOM RI Resmi',
    desc: 'Semua produk aman & terdaftar resmi',
  },
  {
    icon: CheckCircle2,
    title: 'Sertifikasi Halal',
    desc: 'Bahan halal & terjamin kualitasnya',
  },
  {
    icon: Droplets,
    title: 'Air Laut Dalam',
    desc: 'Kaya mineral alami untuk hidrasi',
  },
  {
    icon: HeartHandshake,
    title: 'Uji Dermatologi',
    desc: 'Lembut untuk semua jenis kulit',
  },
];

export function TrustBadgesBar() {
  return (
    <section className="w-full bg-[#FAFCFD] py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_POINTS.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xs bg-[#EBF5F8] flex items-center justify-center text-[#0B6E7D] shrink-0">
                  <Icon className="w-5 h-5 text-[#0B6E7D]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-slate-900 leading-snug">
                    {pt.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
