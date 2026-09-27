import { Link } from 'react-router';
import { MessageCircle, ShieldCheck, Truck, Sparkles, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#081B2B] text-slate-300 pt-16 pb-12 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
              <a
                href="https://wa.me/6281234567890?text=Halo%20Numa%20Skin,%20saya%20mau%20konsultasi%20kulit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-white transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block group-hover:text-[#25D366] transition-colors">Chat WhatsApp Resmi</span>
                  <span className="text-slate-400 text-[11px]">Respon cepat 09.00 - 21.00 WIB</span>
                </div>
              </a>
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
