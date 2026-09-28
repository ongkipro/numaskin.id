import { Star, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Ratna Wulandari',
    location: 'Surabaya',
    age: '38 thn',
    concern: 'Garis Halus & Flek Hitam',
    product: 'Paket Ultimate Anti-Aging 150ml',
    text: 'Awalnya coba karena lihat rekomendasi Pak Sahrul Gunawan. Setelah rutin pakai Treatment Lotion dan Serum NAD+ selama 3 minggu, flek hitam di tulang pipi tampak jauh lebih pudar dan tekstur wajah jadi kenyal banget.',
  },
  {
    name: 'Dewi Anggraeni',
    location: 'Bandung',
    age: '31 thn',
    concern: 'Kulit Dehidrasi & Kemerahan',
    product: 'Deep Sea Water Treatment Lotion 150ml',
    text: 'Toner paling menenangkan yang pernah aku pakai. Teksturnya ringan kayak air tapi pas menyerap langsung berasa plumping. Kemerahan di hidung langsung reda dan gak perih sama sekali.',
  },
  {
    name: 'Dr. Hendra Kusuma',
    location: 'Jakarta Selatan',
    age: '42 thn',
    concern: 'Kerutan & Skin Barrier Pria',
    product: 'Adenosine Deep Sea Water Moisturizer',
    text: 'Sebagai pria yang banyak aktivitas outdoor, saya butuh pelembap yang praktis dengan pompa higienis. Adenosine-nya bikin kulit kencang dan garis tawa di sekitar mulut tidak lagi terlihat dalam.',
  },
];

export function ReviewsCarousel() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8FCFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-xs bg-[#EBF5F8] text-[#0B6E7D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E7D]" />
            <span className="font-mono text-[11px] uppercase tracking-widest font-semibold">
              VERIFIED EVIDENCE
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
            Pengalaman Nyata Sahabat Numa Skin
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Ulasan jujur dari pelanggan terverifikasi yang telah membuktikan khasiat perawatan rutin.
          </p>
        </div>

        {/* Reviews Cards (Flat Minimalist, Rounded Tipis) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-sm bg-white border border-slate-100/90 hover:border-[#38B6CD]/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Concern */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className="font-mono text-[10px] text-[#0B6E7D] bg-[#EBF5F8] px-2.5 py-0.5 rounded-xs font-medium">
                    {rev.concern}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-xs text-slate-900 flex items-center gap-1">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-3 h-3 text-[#0B6E7D]" />
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {rev.location} · {rev.age}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-[#0B6E7D] font-medium text-right max-w-[130px] truncate">
                    {rev.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
