import { Link } from 'react-router';
import type { Route } from './+types/$';

export const meta: Route.MetaFunction = () => [
  { title: '404 — Halaman Tidak Ditemukan | Numa Skin' },
  { name: 'robots', content: 'noindex, nofollow' },
];

export async function loader() {
  // Invariant: enforce 404 status
  throw new Response('Not Found', { status: 404 });
}

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-[#F4F9FA] bg-ocean-ambient p-6 text-center">
      <div className="max-w-md glass-panel rounded-2xl p-8 sm:p-10 shadow-xs">
        <span className="font-mono text-5xl font-bold text-[#002B49] block mb-2 tracking-tight">
          404
        </span>
        <h1 className="font-serif text-xl sm:text-2xl font-normal text-slate-900 mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Tautan yang Anda tuju mungkin salah ketik atau formula telah dipindahkan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#002B49] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#00385F] transition-colors shadow-xs"
          >
            Beranda
          </Link>
          <Link
            to="/collections/all"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#002B49]/40 bg-white/70 text-[#002B49] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Semua Formula
          </Link>
        </div>
      </div>
    </div>
  );
}
