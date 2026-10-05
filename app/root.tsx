import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  Link,
} from 'react-router';
import type { Route } from './+types/root';
import { PageLayout } from '~/components/layout/PageLayout';
import appStyles from '~/styles/app.css?url';

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: appStyles },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
  { rel: 'dns-prefetch', href: 'https://cdn.shopify.com' },
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export const meta: Route.MetaFunction = () => [
  { title: 'Numa Skin Official - Skincare Anti-Aging Deep Sea Water' },
  {
    name: 'description',
    content:
      'Toko resmi Numa Skin Indonesia. Formula peremajaan seluler berbahan Ulleung Deep Sea Water, 2% NAD+, dan Salmon PDRN berizin resmi BPOM RI.',
  },
  { name: 'theme-color', content: '#132A5C' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
  { property: 'og:site_name', content: 'Numa Skin Official' },
  { property: 'og:locale', content: 'id_ID' },
];

export default function App() {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body>
        <PageLayout>
          <Outlet />
        </PageLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = 'Terjadi kesalahan sistem';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.status === 404 ? 'Halaman Tidak Ditemukan' : error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{`${errorStatus} - Numa Skin`}</title>
      </head>
      <body className="min-h-screen flex items-center justify-center bg-[#F4F9FA] bg-ocean-ambient p-6 text-center">
        <div className="max-w-md glass-panel rounded-2xl p-8 sm:p-10 shadow-xs">
          <span className="font-mono text-4xl font-bold text-[#002B49] block mb-2 tracking-tight">
            {errorStatus}
          </span>
          <h1 className="font-serif text-xl sm:text-2xl font-normal text-slate-900 mb-3">
            {errorMessage}
          </h1>
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            Halaman yang Anda cari mungkin telah dipindahkan atau tautan tidak valid.
          </p>
          <Link
            to="/"
            className="inline-flex px-6 py-2.5 rounded-full bg-[#002B49] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#00385F] transition-colors shadow-xs"
          >
            Kembali ke Beranda
          </Link>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
