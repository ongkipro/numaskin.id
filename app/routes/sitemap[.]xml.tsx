import * as mockCatalog from '~/lib/mock-catalog';

export async function loader({ context }: { context: any }) {
  const baseUrl = context?.env?.PRIMARY_DOMAIN || 'https://numaskin.id';
  const products = mockCatalog.getAllProducts();
  const collections = mockCatalog.getAllCollections();

  const staticPages = [
    { url: `${baseUrl}/`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/collections`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/pages/about`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/pages/science`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/pages/bpom`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/pages/faq`, lastmod: new Date().toISOString() },
  ];

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.handle}`,
    lastmod: new Date().toISOString(),
  }));

  const collectionUrls = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.handle}`,
    lastmod: new Date().toISOString(),
  }));

  const allUrls = [...staticPages, ...collectionUrls, ...productUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>daily</changefreq>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
