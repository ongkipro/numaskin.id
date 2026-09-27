import { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const ANNOUNCEMENTS = [
  'Gratis Pengiriman Seluruh Indonesia untuk Pemesanan di Atas Rp 200.000',
  'Formula Klinis Ulleung Deep Sea Water · 100% Terdaftar Resmi BPOM RI & Halal',
  'Jaminan 14 Hari Kulit Lebih Lembap & Kenyal dengan Perawatan Rutin',
];

export function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside
      aria-label="Pengumuman Resmi Numa Skin"
      className="w-full bg-[#002B49] text-white text-[11px] h-9 px-4 sm:px-6 lg:px-8 border-none flex items-center justify-between"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Left: Official Flagship Reassurance */}
        <div className="hidden md:flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38B6CD]" />
          <span className="font-sans tracking-wide text-[11px]">
            Official Flagship Store Indonesia
          </span>
        </div>

        {/* Center: Dynamic Announcement */}
        <div className="flex-1 text-center font-normal px-2 truncate transition-opacity duration-300">
          <span className="text-slate-100 tracking-wide">
            {ANNOUNCEMENTS[currentIdx]}
          </span>
        </div>

        {/* Right: BPOM & Halal Reassurance Badge */}
        <div className="hidden sm:flex items-center gap-2 text-slate-300 text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#38B6CD]" />
          <span className="font-sans font-medium tracking-wide">BPOM & Halal Terverifikasi</span>
        </div>
      </div>
    </aside>
  );
}
