import { useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/blogs._index';
import { BookOpen, Clock, ArrowRight, Sparkles, Droplets, ShieldCheck, ChevronRight } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Jurnal & Edukasi Kulit — Numa Skin Official Store' },
    {
      name: 'description',
      content:
        'Pelajari rahasia sains Ulleung Deep Sea Water, panduan penggunaan 2% NAD+, serta tips rutinitas perawatan skin barrier dari pakar dermatologi Numa Skin.',
    },
  ];
};

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  tag: string;
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'sains-ulleung-deep-sea-water-skin-barrier',
    title: 'Rahasia Ulleung Deep Sea Water: Mengapa Air Kedalaman 1.500m Sangat Efektif Memulihkan Skin Barrier?',
    excerpt:
      'Air laut dalam Pulau Ulleung diekstraksi dari kedalaman lebih dari 1.500 meter di bawah permukaan laut. Memiliki rasio mineral magnesium, kalsium, dan kalium 3:1:1 yang identik dengan cairan tubuh manusia untuk hidrasi trans-epidermal optimal.',
    category: 'Sains Kulit',
    readTime: '5 min baca',
    date: '24 September 2026',
    author: 'Tim Riset & Sains Numa Skin',
    image: '/images/collections/collection-pembersih-toner-banner.webp',
    tag: 'Deep Sea Water',
    featured: true,
  },
  {
    id: '2',
    slug: 'panduan-nad-booster-serum-usia-25',
    title: 'Panduan Lengkap 2% NAD+ Booster: Cara Memaksimalkan Regenerasi Seluler & Elastisitas Kulit di Usia 25+',
    excerpt:
      'Memasuki usia 25 tahun, kadar NAD+ alami dalam sel kulit menurun hingga 50%. Temukan bagaimana molekul koenzim seluler ini menstimulasi mitokondria fibroblas untuk menghasilkan kolagen dan elastin mandiri.',
    category: 'Anti-Aging',
    readTime: '4 min baca',
    date: '20 September 2026',
    author: 'Dra. Ayu Lestari, Apt.',
    image: '/images/collections/collection-anti-aging-series-banner.webp',
    tag: 'NAD+ Booster',
    featured: false,
  },
  {
    id: '3',
    slug: 'urutan-skincare-pagi-dan-malam-optimal',
    title: 'Urutan Rutinitas Skincare Pagi vs Malam yang Tepat agar Penyerapan Bahan Aktif Bekerja Optimal',
    excerpt:
      'Langkah terstruktur mulai dari pembersihan berbusa lembut non-stripping, hydrating treatment lotion, serum konsentrat, hingga penguncian barrier moisturizer dan perlindungan UV spektrum luas.',
    category: 'Rutinitas Perawatan',
    readTime: '6 min baca',
    date: '15 September 2026',
    author: 'Numa Beauty Advisor',
    image: '/images/collections/collection-serum-treatment-banner.webp',
    tag: 'Skincare Routine',
    featured: false,
  },
  {
    id: '4',
    slug: 'mitos-sunscreen-kulit-berminyak-oxydew-spf50',
    title: 'Mitos Tabir Surya untuk Kulit Berminyak: Mengapa Oxydew SPF 50+ Tidak Menyumbat Pori & Bebas White Cast',
    excerpt:
      'Banyak anggapan sunscreen membuat wajah mengkilap dan kusam. Pelajari bagaimana formulasi micro-encapsulated UV filter dan ekstrak marine botani menjaga kulit tetap bernapas dan matte alami.',
    category: 'Proteksi UV',
    readTime: '4 min baca',
    date: '10 September 2026',
    author: 'Tim Riset Dermatologi',
    image: '/images/collections/collection-tabir-surya-perlindungan-banner.webp',
    tag: 'Sunscreen Oxydew',
    featured: false,
  },
  {
    id: '5',
    slug: 'perbedaan-adenosine-dan-pdrn-moisturizer',
    title: 'Adenosine vs PDRN: Memilih Pelembap yang Tepat untuk Kebutuhan Skin Barrier & Tone-Up Kulit Anda',
    excerpt:
      'Bedah tuntas fungsi spesifik Adenosine untuk kekenyalan jaringan kolagen dan PDRN DNA Salmon untuk stimulasi pemulihan tekstur serta perataan warna kulit kusam.',
    category: 'Bahan Aktif',
    readTime: '5 min baca',
    date: '5 September 2026',
    author: 'Tim Formulasi Numa Skin',
    image: '/images/collections/collection-pelembap-krim-pagi-banner.webp',
    tag: 'Moisturizer & Barrier',
    featured: false,
  },
];

const CATEGORIES = ['Semua', 'Sains Kulit', 'Anti-Aging', 'Rutinitas Perawatan', 'Proteksi UV', 'Bahan Aktif'];

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredPosts =
    selectedCategory === 'Semua'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="w-full bg-[#F4F9FA] bg-ocean-ambient min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#002B49] transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#002B49] font-medium">Jurnal & Edukasi Kulit</span>
        </nav>
      </div>

      {/* Header Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="aqua-glass-panel rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-white/80 shadow-[0_10px_30px_rgba(0,43,73,0.04)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF5F8] border border-[#269BA8]/20 text-[#002B49] text-[11px] font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#269BA8]" />
            <span>NUMA SCIENCE JOURNAL & EDUCATION</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-slate-900 font-normal tracking-tight mb-4">
            Jurnal Sains Kulit & Edukasi Rutinitas
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Wawasan mendalam seputar kebaikan mineral laut dalam, mekanisme regenerasi seluler NAD+, dan panduan perawatan berbasis bukti dermatologis.
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-6 border-t border-[#E2EDF0] text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#269BA8]" />
              Formulasi Ulleung Deep Sea Water
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#269BA8]" />
              100% Teruji Klinis & BPOM Resmi
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#269BA8]" />
              Riset Berbasis Bukti Ilmiah
            </span>
          </div>
        </div>
      </section>

      {/* Category Pills Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 font-medium ${
                selectedCategory === cat
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:text-[#002B49] border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article Hero (Shown when "Semua" is selected) */}
      {selectedCategory === 'Semua' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="group relative bg-white/90 backdrop-blur-md rounded-2xl border border-white/80 shadow-[0_12px_40px_rgba(0,43,73,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-slate-100">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#002B49]/90 text-white text-[10px] font-mono uppercase tracking-wider font-semibold shadow-xs">
                  Artikel Pilihan
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#269BA8] mb-3">
                  <span>{featuredPost.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-slate-900 font-medium mb-3 leading-snug group-hover:text-[#269BA8] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span className="block font-medium text-slate-700">{featuredPost.author}</span>
                  <span className="text-[11px] text-slate-400">{featuredPost.date}</span>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#002B49] group-hover:text-[#269BA8] group-hover:translate-x-0.5 transition-all">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white/90 backdrop-blur-md rounded-2xl border border-white/80 shadow-[0_6px_24px_rgba(0,43,73,0.04)] overflow-hidden flex flex-col hover:shadow-[0_12px_36px_rgba(0,43,73,0.08)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#002B49] text-[10px] font-mono uppercase tracking-wider font-semibold">
                  {post.tag}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#269BA8] mb-2">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-slate-900 font-medium mb-2.5 leading-snug group-hover:text-[#269BA8] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">{post.date}</span>
                  <div className="inline-flex items-center gap-1 font-medium text-[#002B49] group-hover:text-[#269BA8] transition-colors">
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skincare Advisor Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="aqua-glass-panel rounded-2xl p-6 sm:p-8 border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#269BA8] font-bold block mb-1">
              KONSULTASI PRIBADI
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-medium">
              Masih Bingung Menentukan Rutinitas yang Tepat?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
              Konsultasikan masalah kulit Anda dengan Skin Advisor Numa Skin secara gratis melalui WhatsApp resmi.
            </p>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Numa%20Skin,%20saya%20mau%20konsultasi%20rutinitas%20skincare"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-full bg-[#002B49] text-white text-xs font-semibold hover:bg-[#0D1D40] transition-colors shadow-xs flex items-center gap-2"
          >
            <span>Tanya Skin Advisor Gratis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
