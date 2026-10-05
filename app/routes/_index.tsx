import { useLoaderData } from 'react-router';
import type { Route } from './+types/_index';
import { HeroBanner } from '~/components/home/HeroBanner';
import { TrustBadgesBar } from '~/components/home/TrustBadgesBar';
import { ShopeeBannerSection } from '~/components/home/ShopeeBannerSection';
import { FeaturedCollectionsShowcase } from '~/components/home/FeaturedCollectionsShowcase';
import { RoutineStepper } from '~/components/home/RoutineStepper';
import { ActiveIngredientsSpotlight } from '~/components/home/ActiveIngredientsSpotlight';
import { BundleSavingsMatrix } from '~/components/home/BundleSavingsMatrix';
import { AmbassadorSpotlight } from '~/components/home/AmbassadorSpotlight';
import * as mockCatalog from '~/lib/mock-catalog';

export const links: Route.LinksFunction = () => [
  {
    rel: 'preload',
    as: 'image',
    href: '/videos/numa-skin-water-splash-mobile-poster.jpg',
    media: '(max-width: 639px)',
  },
  {
    rel: 'preload',
    as: 'image',
    href: '/videos/numa-skin-water-splash-hero-poster.jpg',
    media: '(min-width: 640px)',
  },
];

export const meta: Route.MetaFunction = () => {
  const title = 'Numa Skin Official Store - Skincare Anti-Aging Deep Sea Water';
  const description =
    'Toko resmi Numa Skin Indonesia. Formula anti-aging seluler berbasis Ulleung Deep Sea Water, 2% NAD+, dan Salmon PDRN berizin resmi BPOM RI.';
  const canonicalUrl = 'https://numaskin.id';
  const image = 'https://cdn.shopify.com/s/files/1/0826/9368/5494/collections/collection-semua-produk-banner.webp?v=1790485361';

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },

    // OpenGraph
    { property: 'og:site_name', content: 'Numa Skin Official' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
};

export async function loader({ context }: Route.LoaderArgs) {
  const featuredSingles = mockCatalog.getFeaturedSingles();
  const bundles = mockCatalog.getAllBundles();
  const routineProducts = mockCatalog.getRoutineProducts();

  // Canonical Shopify pattern: 8 Core flagship products for home featured collection
  const coreProducts = [...featuredSingles, bundles[0]].filter(Boolean);

  return {
    coreProducts,
    bundles,
    routineProducts,
  };
}

export default function IndexPage() {
  const { coreProducts, bundles, routineProducts } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      {/* Schema.org Organization & WebSite Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Numa Skin Official',
              url: 'https://numaskin.id',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://numaskin.id/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Numa Skin',
              url: 'https://numaskin.id',
              logo: 'https://numaskin.id/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg',
              sameAs: [
                'https://shopee.co.id/numaskin.official',
                'https://www.tiktok.com/@numaskinofficial',
                'https://www.instagram.com/numaskinofficial',
              ],
            },
          ]),
        }}
      />
      {/* 01. Video Hero Banner */}
      <HeroBanner />

      {/* 02. Reassurance Bar */}
      <TrustBadgesBar />

      {/* 03. Shopee Official Campaign Banners */}
      <ShopeeBannerSection />

      {/* 04. Featured Collections Showcase (8 Core Products, Standard Shopify Grid) */}
      <FeaturedCollectionsShowcase products={coreProducts} />

      {/* 04. 4-Step Rejuvenation Ritual */}
      <RoutineStepper products={routineProducts} />

      {/* 05. Clinical Actives & Deep Sea Water Science */}
      <ActiveIngredientsSpotlight />

      {/* 06. Curated Bundles Savings Matrix */}
      <BundleSavingsMatrix bundles={bundles} />

      {/* 07. Brand Ambassador & 14-Day Evidence */}
      <AmbassadorSpotlight />
    </div>
  );
}
