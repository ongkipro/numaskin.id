import { Link } from 'react-router';
import { MessageCircle, ShieldCheck, Truck, Sparkles, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#081B2B] text-slate-300 pt-16 pb-12 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* PRE-FOOTER: Dedicated Luxury WhatsApp Consultation Banner */}
        {/* ========================================================= */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B2540] via-[#002B49] to-[#0A2035] border border-white/15 p-8 sm:p-10 mb-16 shadow-2xl">
          {/* Subtle Ambient Refraction Glow */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-[#269BA8]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 rounded-full bg-[#38B6CD]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 8 Cols: Value Proposition */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SKIN ADVISOR ONLINE · RESPON CEPAT &lt; 5 MENIT</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug mb-3">
                Butuh Rekomendasi Rutinitas yang Tepat untuk Kulit Anda?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mb-6">
                Bingung memilih toner mineral laut dalam, konsentrat serum 2% NAD+, atau paket rutinitas yang paling sesuai dengan kondisi kulit Anda? Diskusikan langsung dengan Skin Advisor resmi Numa Skin tanpa biaya.
              </p>

              {/* Consultation Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38B6CD] shrink-0" />
                  <span>Analisis Tipe Kulit Gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38B6CD] shrink-0" />
                  <span>Rekomendasi Paket Tepat Sasaran</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38B6CD] shrink-0" />
                  <span>Panduan Pemakaian Pagi & Malam</span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: High-Contrast WhatsApp CTA */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Numa%20Skin,%20saya%20mau%20konsultasi%20kulit"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span className="tracking-wide">Chat WhatsApp Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-[11px] text-slate-400 mt-2.5 block text-center font-mono">
                Layanan Resmi · 09.00 - 21.00 WIB
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4-COLUMN ARCHITECTURAL DIRECTORY                          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Identity & Japanese Heritage */}
          <div>
            <div className="mb-4">
              <span className="font-semibold text-lg tracking-[0.22em] text-white block">
                NUMA · SKIN
              </span>
              <span className="text-[11px] tracking-[0.28em] text-[#38B6CD]">
                ヌマスキン
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Filosofi perawatan mindful J-Beauty berpadu dengan kemurnian mineral Ulleung Deep Sea Water dan molekul 2% NAD+ untuk menjaga kelembapan esensial, memperbaiki skin barrier, serta merawat elastisitas kulit wajah.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono">
              <Award className="w-3.5 h-3.5 text-[#38B6CD]" />
              <span>100% Terdaftar Resmi BPOM RI</span>
            </div>
          </div>

          {/* Col 2: Katalog Produk & Rangkaian */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Katalog & Rangkaian
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/collections/anti-aging-series" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Anti-Aging Series (2% NAD+)</span>
                  <span className="text-[10px] text-[#38B6CD] font-mono">Unggulan</span>
                </Link>
              </li>
              <li>
                <Link to="/collections/cleanser-toner" className="hover:text-white transition-colors">
                  Pembersih Wajah & Hydrating Toner
                </Link>
              </li>
              <li>
                <Link to="/collections/serum-treatment" className="hover:text-white transition-colors">
                  Serum & Perawatan Intensif
                </Link>
              </li>
              <li>
                <Link to="/collections/moisturizer-day-cream" className="hover:text-white transition-colors">
                  Pelembap Wajah & Barrier Cream
                </Link>
              </li>
              <li>
                <Link to="/collections/sunscreen-protection" className="hover:text-white transition-colors">
                  Tabir Surya Oxydew SPF 50+ PA++++
                </Link>
              </li>
              <li>
                <Link to="/collections/paket-hemat-bundling" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Paket Hemat Rutinitas</span>
                  <span className="text-[10px] text-amber-300 font-mono">42 Set</span>
                </Link>
              </li>
              <li>
                <Link to="/collections/all" className="hover:text-white transition-colors text-slate-400">
                  Lihat Seluruh Katalog Produk →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Edukasi, Sains & Transparansi */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Edukasi & Sains
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/blogs" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#38B6CD]" />
                  <span>Jurnal Edukasi & Sains Kulit</span>
                </Link>
              </li>
              <li>
                <Link to="/pages/science" className="hover:text-white transition-colors">
                  Sains Ulleung Deep Sea Water
                </Link>
              </li>
              <li>
                <Link to="/pages/bpom" className="hover:text-white transition-colors">
                  Verifikasi Nomor Izin Edar BPOM RI
                </Link>
              </li>
              <li>
                <Link to="/pages/about" className="hover:text-white transition-colors">
                  Kisah & Filosofi Numa Skin
                </Link>
              </li>
              <li>
                <Link to="/pages/faq" className="hover:text-white transition-colors">
                  Pusat Bantuan & FAQ Pelanggan
                </Link>
              </li>
              <li>
                <Link to="/pages/faq" className="hover:text-white transition-colors">
                  Keamanan Ibu Hamil & Menyusui
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Jaminan Layanan & Pengiriman */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4">
              Jaminan & Layanan
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#38B6CD] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">100% Garansi Original</span>
                  <span className="text-slate-400 text-[11px]">Produk resmi langsung dari pabrik dengan segel resmi.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#38B6CD] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Pengiriman Seluruh Nusantara</span>
                  <span className="text-slate-400 text-[11px]">Bekerja sama dengan kurir JNE, SiCepat, dan J&T.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#38B6CD] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Gratis Ongkir &gt; Rp 200.000</span>
                  <span className="text-slate-400 text-[11px]">Otomatis berlaku di checkout tanpa klaim voucher.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM STRIP: Trust Badges & Copyright                   */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-[11px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Badan Pengawas Obat & Makanan (BPOM RI)
            </span>
            <span className="text-slate-600">•</span>
            <span>Halal Certified Indonesia</span>
            <span className="text-slate-600">•</span>
            <span>Dermatologist Tested</span>
            <span className="text-slate-600">•</span>
            <span>Bebas Uji Coba Hewan (Cruelty-Free)</span>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] text-slate-400">
            © {new Date().getFullYear()} Numa Skin Indonesia (numaskin.id). Hak cipta dilindungi undang-undang.
          </div>
        </div>

      </div>
    </footer>
  );
}
