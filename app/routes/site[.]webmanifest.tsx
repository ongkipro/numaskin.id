import icon192 from '~/assets/icons/android-chrome-192x192.png';
import icon512 from '~/assets/icons/android-chrome-512x512.png';

export async function loader() {
  const manifest = {
    name: 'Numa Skin Official Store',
    short_name: 'Numa Skin',
    icons: [
      {
        src: icon192,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: icon512,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#132A5C',
    background_color: '#F4F9FA',
    display: 'standalone',
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
