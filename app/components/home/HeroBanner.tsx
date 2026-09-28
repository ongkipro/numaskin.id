import { Link } from 'react-router';
import { ArrowRight, ShieldCheck, Droplets } from 'lucide-react';

export function HeroBanner() {
  return (
    <section
      aria-label="Numa Skin Deep Sea Water Hero"
      className="relative w-full h-screen h-[100svh] sm:h-[100dvh] min-h-[520px] sm:min-h-[600px] max-h-[1080px] overflow-hidden flex flex-col justify-between select-none touch-pan-y touch-manipulation bg-[#EBF5F8]"
    >
      {/* ========================================================= */}
      {/* 1. BACKGROUND VIDEO (Numa Skin Water Splash - Optimized)  */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden transform-gpu">
        {/* Mobile Portrait Video (9:16 - Optimized for Mobile Screen) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/numa-skin-water-splash-mobile-poster.jpg"
          className="w-full h-full object-cover object-center sm:hidden transform-gpu will-change-transform"
        >
          <source src="/videos/numa-skin-water-splash-mobile.webm" type="video/webm" />
          <source src="/videos/numa-skin-water-splash-mobile.mp4" type="video/mp4" />
        </video>

        {/* Desktop Landscape Video (16:9 - Optimized for Wide Screen) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/numa-skin-water-splash-hero-poster.jpg"
          className="w-full h-full object-cover object-center hidden sm:block"
        >
          <source src="/videos/numa-skin-water-splash-hero.webm" type="video/webm" />
          <source src="/videos/numa-skin-water-splash-hero.mp4" type="video/mp4" />
        </video>

        {/* Desktop: Natural Left Diffusion Gradient (Feathered Sea Mist) */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#F4F9FA]/85 via-[#F4F9FA]/40 to-transparent w-full lg:w-3/5 pointer-events-none" />

        {/* Top Vignette (Gradasi atas menyatu halus dengan header, desktop & mobile) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#EBF5F8]/70 via-[#EBF5F8]/20 to-transparent pointer-events-none" />

        {/* Bottom Soft Dissolve (Menyatu ke section berikutnya tanpa celah) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFCFD] via-[#FAFCFD]/50 to-transparent pointer-events-none" />

        {/* Mobile: Gentle Natural Bottom Fade - Protects typography while keeping product tube 100% vibrant */}
        <div className="sm:hidden absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#FAFCFD] via-[#FAFCFD]/85 via-35% via-[#EBF5F8]/45 via-70% to-transparent pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* 2. NATURAL EDITORIAL HERO (No Card, Pure Skincare Elegance)*/}
      {/* ========================================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between pt-20 sm:pt-28 lg:pt-36 pb-3 sm:pb-8 z-20">
        
        {/* Content Column: Anchored to Bottom on Mobile, Centered on Desktop */}
        <div className="mt-auto sm:my-auto pb-3 pt-2 sm:py-4 max-w-xl lg:max-w-2xl text-left">
          
          {/* Top Brand & Science Signature (Clean white pill, rounded tipis) */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xs bg-white/95 border border-white/90 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E7D]" />
            <span className="font-mono text-[9px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] text-[#002B49] uppercase">
              DEEP SEA MINERAL SCIENCE · ヌマスキン
            </span>
          </div>

          {/* Master Headline: Punchy, Pure & Natural */}
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-[54px] text-[#002B49] leading-[1.15] sm:leading-[1.12] font-normal mb-2 sm:mb-4 tracking-tight">
            Kemurnian Laut Dalam untuk Kulit Awet Muda
          </h1>

          {/* Body Description: Concise Clinical Formulation */}
          <p className="text-xs sm:text-base text-slate-800 leading-relaxed mb-3.5 sm:mb-7 max-w-lg font-medium">
            Formula klinis 83% Ulleung Deep Sea Water dan 2% Swiss NAD+ Booster. 
            Menghidrasi hingga ke lapisan seluler dan merawat elastisitas alami kulit.
          </p>

          {/* Dual Action CTAs: Refractive Aqua Glass System (Rounded Tipis & Presisi) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-7">
            <Link
              to="/collections/all"
              className="btn-glass-primary px-3.5 sm:px-7 py-2.5 sm:py-3.5 text-[11px] sm:text-xs text-center group"
            >
              <span>Jelajahi Koleksi</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38B6CD] group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              to="/collections/paket-hemat-bundling"
              className="btn-glass-secondary px-3 sm:px-6 py-2.5 sm:py-3.5 text-[11px] sm:text-xs text-center truncate"
            >
              <span>Paket Hemat</span>
            </Link>
          </div>

          {/* Clinical Formulation Spec Strip */}
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 text-[10px] sm:text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E7D]" />
              83% Deep Sea Water
            </span>
            <span className="text-slate-300">·</span>
            <span>2% Swiss NAD+</span>
            <span className="text-slate-300">·</span>
            <span>Salmon PDRN</span>
            <span className="text-slate-300">·</span>
            <span>BPOM & Halal</span>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM REASSURANCE & SCROLL INDICATOR STRIP           */}
        {/* ========================================================= */}
        <div className="w-full pt-1 sm:pt-2">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-600 font-mono pt-2 sm:pt-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B6E7D] flex-shrink-0" />
              <span className="sm:hidden">Official Store · 100% BPOM Resmi & Halal</span>
              <span className="hidden sm:inline">Toko Resmi Numa Skin Indonesia · 100% Produk Asli & Halal</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-600">
              <Droplets className="w-3.5 h-3.5 text-[#0B6E7D]" />
              <span>Scroll untuk Eksplorasi</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
