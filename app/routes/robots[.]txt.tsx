export async function loader({ context }: { context: any }) {
  const baseUrl = context?.env?.PRIMARY_DOMAIN || 'https://numaskin.id';

  const robots = `# ==============================================================================
# Numa Skin Official (numaskin.id) — Edge Robots & AI Discovery Policy
# ==============================================================================

# Standard Search Engine Crawlers (Google, Bing, Yandex, DuckDuckGo)
User-agent: *
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /cdn-cgi/

# Generative AI, Answer Engines & LLM Citations (GEO / AEO Friendly)
# Explicitly allowing product & knowledge retrieval while protecting sensitive paths
User-agent: GPTBot
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /cdn-cgi/

User-agent: OAI-SearchBot
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /cdn-cgi/

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /cdn-cgi/

User-agent: ClaudeBot
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /cdn-cgi/

User-agent: Google-Extended
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /cdn-cgi/

User-agent: Applebot-Extended
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /cdn-cgi/

User-agent: Amazonbot
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search
Disallow: /cdn-cgi/

# Dynamic Edge Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
