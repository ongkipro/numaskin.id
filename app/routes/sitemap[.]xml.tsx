import * as mockCatalog from '~/lib/mock-catalog';

export async function loader({ context }: { context: any }) {
  const baseUrl = context?.env?.PRIMARY_DOMAIN || 'https://numaskin.id';
  const products = mockCatalog.getAllProducts();
  const collections = mockCatalog
    .getAllCollections()
    .filter((c) => c.handle !== 'frontpage');

  // Core Static & Content Landing Pages
  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/collections`, priority: '0.8', changefreq: 'daily' },
    { url: `${baseUrl}/blogs`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/pages/about`, priority: '0.7', changefreq: 'monthly' },
    { url: `${baseUrl}/pages/science`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/pages/bpom`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/pages/faq`, priority: '0.7', changefreq: 'monthly' },
    { url: `${baseUrl}/policies`, priority: '0.5', changefreq: 'monthly' },
    { url: `${baseUrl}/policies/shipping-policy`, priority: '0.5', changefreq: 'monthly' },
    { url: `${baseUrl}/policies/refund-policy`, priority: '0.5', changefreq: 'monthly' },
    { url: `${baseUrl}/policies/privacy-policy`, priority: '0.4', changefreq: 'monthly' },
    { url: `${baseUrl}/policies/terms-of-service`, priority: '0.4', changefreq: 'monthly' },
  ];

  // Collection PLPs (Faceted Category Hubs)
  const collectionUrls = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.handle}`,
    priority: '0.8',
    changefreq: 'daily',
  }));

  // Product Detail Pages (Singles & Curated Bundles)
  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.handle}`,
    priority: '0.9',
    changefreq: 'daily',
  }));

  const now = new Date().toISOString();
  const allUrls = [
    ...staticPages.map((item) => ({ ...item, lastmod: now })),
    ...collectionUrls.map((item) => ({ ...item, lastmod: now })),
    ...productUrls.map((item) => ({ ...item, lastmod: now })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
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
