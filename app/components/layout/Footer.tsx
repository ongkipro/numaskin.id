import { Link } from 'react-router';
import {
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#F8FCFD] text-slate-600 relative overflow-hidden mt-auto">
      {/* Seamless transition: flows naturally from preceding #F8FCFD section without harsh borders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14 sm:pt-16 pb-12 sm:pb-16">
        
        {/* =================================================================== */}
        {/* 4-COLUMN ARCHITECTURAL DIRECTORY (Clean Typography, Zero Boxes)     */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200/60">
          
          {/* Column 1: Brand Essence & Identity (Lg: 4 Cols) */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4 group">
              <span className="font-semibold text-xl tracking-[0.24em] text-[#002B49] block">
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

          {/* Column 2: Katalog Produk (Lg: 3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#002B49] mb-4">
              Koleksi & Produk
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/collections/paket-hemat-bundling" className="hover:text-[#002B49] transition-colors flex items-center justify-between">
                  <span>Paket Hemat Rutinitas</span>
                  <span className="font-mono text-[10px] text-[#0B6E7D] font-medium">Hemat 23%</span>
                </Link>
              </li>
              <li>
                <Link to="/collections/anti-aging-series" className="hover:text-[#002B49] transition-colors flex items-center justify-between">
                  <span>Anti-Aging Series (2% NAD+)</span>
                  <span className="font-mono text-[10px] text-slate-400">Unggulan</span>
                </Link>
              </li>
              <li>
                <Link to="/collections/cleanser-toner" className="hover:text-[#002B49] transition-colors">
                  Pembersih Wajah & Hydrating Toner
                </Link>
              </li>
              <li>
                <Link to="/collections/serum-treatment" className="hover:text-[#002B49] transition-colors">
                  Serum & Perawatan Intensif Flek
                </Link>
              </li>
              <li>
                <Link to="/collections/moisturizer-day-cream" className="hover:text-[#002B49] transition-colors">
                  Pelembap Gel & Barrier Cream
                </Link>
              </li>
              <li>
                <Link to="/collections/sunscreen-protection" className="hover:text-[#002B49] transition-colors">
                  Tabir Surya Oxydew SPF 50+ PA++++
                </Link>
              </li>
              <li className="pt-1.5">
                <Link to="/collections/all" className="hover:text-[#0B6E7D] transition-colors text-[#002B49] font-mono text-[11px] uppercase tracking-wider font-semibold block">
                  Lihat Seluruh Katalog (42 Produk) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Bantuan & Info (Lg: 2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#002B49] mb-4">
              Bantuan & Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/pages/faq" className="hover:text-[#002B49] transition-colors">
                  Pusat Bantuan & FAQ
                </Link>
              </li>
              <li>
                <Link to="/pages/science" className="hover:text-[#002B49] transition-colors">
                  Sains Air Laut Dalam
                </Link>
              </li>
              <li>
                <Link to="/pages/bpom" className="hover:text-[#002B49] transition-colors">
                  Izin Edar BPOM RI
                </Link>
              </li>
              <li>
                <Link to="/pages/about" className="hover:text-[#002B49] transition-colors">
                  Tentang Numa Skin
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-[#002B49] transition-colors">
                  Jurnal & Tips Kulit
                </Link>
              </li>
              <li>
                <Link to="/pages/privacy-policy" className="hover:text-[#002B49] transition-colors text-slate-400">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/pages/terms" className="hover:text-[#002B49] transition-colors text-slate-400">
                  Syarat & Ketentuan
                </Link>
              </li>
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
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002B49] hover:text-[#0B6E7D] transition-colors group"
              >
                <span>Mulai Konsultasi Gratis</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
        {/* BOTTOM COPYRIGHT & LEGAL NOTICE                                     */}
        {/* =================================================================== */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
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
            © 2022 Numa Skin Official. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
