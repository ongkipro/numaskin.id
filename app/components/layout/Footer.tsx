import { Link, useLocation } from 'react-router';
import {
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
} from 'lucide-react';

export function Footer() {
  const location = useLocation();

  const isLinkActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/pages/about', label: 'Tentang Numa Skin' },
    { to: '/pages/science', label: 'Sains Air Laut Dalam' },
    { to: '/blogs', label: 'Jurnal & Tips Kulit' },
    { to: '/pages/faq', label: 'Pusat Bantuan & FAQ' },
  ];

  const categoryLinks = [
    { to: '/collections/all', label: 'Semua Produk', badge: 'Katalog Lengkap', badgeAqua: true },
    { to: '/collections/paket-hemat-bundling', label: 'Paket Rutinitas Hemat', badge: 'Hemat 23%', badgeAqua: true },
    { to: '/collections/anti-aging-series', label: 'Anti-Aging (2% NAD+)', badge: 'Unggulan', badgeAqua: false },
    { to: '/collections/cleanser-toner', label: 'Pembersih Wajah & Toner' },
    { to: '/collections/serum-treatment', label: 'Serum & Perawatan Flek' },
    { to: '/collections/moisturizer-day-cream', label: 'Pelembap Gel & Barrier Cream' },
    { to: '/collections/sunscreen-protection', label: 'Tabir Surya Oxydew SPF 50+' },
  ];

  const policyLinks = [
    { to: '/policies/privacy-policy', label: 'Kebijakan Privasi' },
    { to: '/policies/terms-of-service', label: 'Syarat & Ketentuan' },
    { to: '/policies/shipping-policy', label: 'Kebijakan Pengiriman' },
    { to: '/policies/refund-policy', label: 'Kebijakan Pengembalian' },
    { to: '/pages/bpom', label: 'Izin Edar BPOM RI' },
  ];

  return (
    <footer className="w-full bg-[#F8FCFD] text-slate-600 relative overflow-hidden mt-auto border-none">
      {/* Seamless transition: flows naturally from preceding #F8FCFD section without harsh borders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14 sm:pt-16 pb-12 sm:pb-16">
        
        {/* =================================================================== */}
        {/* 4-COLUMN ARCHITECTURAL DIRECTORY (Clean Typography, Zero Boxes)     */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200/60">
          
          {/* Column 1: Brand Essence & Identity (Lg: 4 Cols) */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4 group">
              <span className="font-semibold text-xl tracking-[0.24em] text-[#002B49] block transition-colors group-hover:text-[#0B6E7D]">
                NUMA · SKIN
              </span>
              <span className="text-[11px] tracking-[0.3em] text-[#0B6E7D] block font-light">
                ヌマスキン · DEEP SEA WATER
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-normal max-w-sm">
              Perawatan kulit berbasis kemurnian <strong className="text-[#002B49] font-medium">Ulleung Island Deep Sea Water</strong> dipadukan bioaktif regenerasi seluler <strong className="text-[#002B49] font-medium">2% NAD+ & Salmon PDRN</strong> untuk menjaga elastisitas, memudarkan flek, dan merawat skin barrier.
            </p>

            {/* Official Credentials (Clean inline list, zero box containers) */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0B6E7D] shrink-0" />
                <span>100% Terdaftar Resmi BPOM RI</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0B6E7D] shrink-0" />
                <span>Sertifikasi Halal Indonesia & Teruji Dermatologi</span>
              </div>
            </div>
          </div>

          {/* Column 2: Menu Utama / Navigasi (Lg: 2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#002B49] mb-4">
              Menu Utama
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {navLinks.map((item) => {
                const active = isLinkActive(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`group flex items-center gap-1.5 transition-all duration-200 ${
                        active
                          ? 'text-[#002B49] font-semibold translate-x-1'
                          : 'text-slate-600 hover:text-[#0B6E7D] hover:translate-x-1'
                      }`}
                    >
                      <span
                        className={`h-0.5 rounded-full bg-[#0B6E7D] transition-all duration-200 ${
                          active
                            ? 'w-2.5 opacity-100'
                            : 'w-0 opacity-0 group-hover:w-2 group-hover:opacity-100'
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Numa%20Skin,%20saya%20mau%20bertanya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-slate-600 hover:text-[#0B6E7D] hover:translate-x-1 transition-all duration-200"
                >
                  <span className="w-0 opacity-0 group-hover:w-2 group-hover:opacity-100 h-0.5 rounded-full bg-[#0B6E7D] transition-all duration-200" />
                  <span>Hubungi Kami</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Kategori Produk (Lg: 3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#002B49] mb-4">
              Kategori Produk
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {categoryLinks.map((cat) => {
                const active = isLinkActive(cat.to);
                return (
                  <li key={cat.to}>
                    <Link
                      to={cat.to}
                      className={`group flex items-center justify-between transition-all duration-200 ${
                        active
                          ? 'text-[#002B49] font-semibold'
                          : 'text-slate-600 hover:text-[#0B6E7D]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 transition-transform duration-200 group-hover:translate-x-1">
                        <span
                          className={`h-0.5 rounded-full bg-[#0B6E7D] transition-all duration-200 ${
                            active
                              ? 'w-2.5 opacity-100'
                              : 'w-0 opacity-0 group-hover:w-2 group-hover:opacity-100'
                          }`}
                        />
                        <span>{cat.label}</span>
                      </span>
                      {cat.badge && (
                        <span
                          className={`font-mono text-[10px] transition-colors duration-200 ${
                            cat.badgeAqua
                              ? 'text-[#0B6E7D] font-medium group-hover:text-[#002B49]'
                              : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        >
                          {cat.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Layanan & Konsultasi (Lg: 3 Cols - Zero Box Cards) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#002B49] mb-4">
              Konsultasi & Layanan
            </h4>
            
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-900">WhatsApp Skin Advisor</span>
              </div>
              <span className="font-mono text-[11px] text-[#0B6E7D] block mb-2">
                Online 09.00 – 21.00 WIB
              </span>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Konsultasikan masalah flek hitam, kerutan, atau pemilihan produk yang tepat bersama skin advisor kami.
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Numa%20Skin,%20saya%20mau%20konsultasi%20skincare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002B49] hover:text-[#0B6E7D] hover:translate-x-1 transition-all duration-200 group"
              >
                <span>Mulai Konsultasi Gratis</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>

            <div className="space-y-2 text-xs text-slate-500 pt-3 border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#0B6E7D] shrink-0" />
                <span>Pengiriman Cepat (JNE/SiCepat/J&T)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B6E7D] shrink-0" />
                <span>Garansi 100% Produk Asli & Segel Resmi</span>
              </div>
            </div>
          </div>

        </div>

        {/* =================================================================== */}
        {/* POLICIES & LEGAL LINKS ROW (Kebijakan di List Bawah)                */}
        {/* =================================================================== */}
        <div className="py-6 border-b border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B6E7D] font-semibold">
              Kebijakan:
            </span>
            {policyLinks.map((pol) => {
              const active = isLinkActive(pol.to);
              return (
                <Link
                  key={pol.to}
                  to={pol.to}
                  className={`transition-all duration-200 ${
                    active
                      ? 'text-[#002B49] font-medium underline underline-offset-4 decoration-[#0B6E7D]'
                      : 'hover:text-[#0B6E7D]'
                  }`}
                >
                  {pol.label}
                </Link>
              );
            })}
          </div>
          
          <div className="font-mono text-[10px] text-slate-400">
            Terverifikasi Sistem Resmi
          </div>
        </div>

        {/* =================================================================== */}
        {/* BOTTOM COPYRIGHT & CERTIFICATION NOTICE                             */}
        {/* =================================================================== */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] text-slate-500">
            <span>Badan Pengawas Obat & Makanan (BPOM RI)</span>
            <span className="text-slate-300">•</span>
            <span>Halal Certified Indonesia</span>
            <span className="text-slate-300">•</span>
            <span>Dermatologist Tested</span>
            <span className="text-slate-300">•</span>
            <span>Cruelty-Free</span>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] text-slate-400">
            © 2026 Numa Skin Official. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
