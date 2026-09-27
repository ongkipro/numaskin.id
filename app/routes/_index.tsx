import { useLoaderData } from 'react-router';
import type { Route } from './+types/_index';
import { HeroBanner } from '~/components/home/HeroBanner';
import { TrustBadgesBar } from '~/components/home/TrustBadgesBar';
import { FeaturedCollectionsShowcase } from '~/components/home/FeaturedCollectionsShowcase';
import { RoutineStepper } from '~/components/home/RoutineStepper';
import { ActiveIngredientsSpotlight } from '~/components/home/ActiveIngredientsSpotlight';
import { BundleSavingsMatrix } from '~/components/home/BundleSavingsMatrix';
import { AmbassadorSpotlight } from '~/components/home/AmbassadorSpotlight';
import { ReviewsCarousel } from '~/components/home/ReviewsCarousel';
import { FaqAccordion } from '~/components/home/FaqAccordion';
import * as mockCatalog from '~/lib/mock-catalog';

export const meta: Route.MetaFunction = () => [
  { title: 'Numa Skin Official — Formula Anti-Aging & Hidrasi Deep Sea Water' },
  {
    name: 'description',
    content: 'Toko resmi Numa Skin Indonesia. Formula peremajaan seluler berbahan dasar Ulleung Island Deep Sea Water, 2% NAD+ Booster, dan Salmon PDRN terdaftar resmi BPOM.',
  },
];

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
      {/* 01. Video Hero Banner */}
      <HeroBanner />

      {/* 02. Reassurance Bar */}
      <TrustBadgesBar />

      {/* 03. Featured Collections Showcase (8 Core Products, Standard Shopify Grid) */}
      <FeaturedCollectionsShowcase products={coreProducts} />

      {/* 04. 4-Step Rejuvenation Ritual */}
      <RoutineStepper products={routineProducts} />

      {/* 05. Clinical Actives & Deep Sea Water Science */}
      <ActiveIngredientsSpotlight />

      {/* 06. Curated Bundles Savings Matrix */}
      <BundleSavingsMatrix bundles={bundles} />

      {/* 07. Brand Ambassador & 14-Day Evidence */}
      <AmbassadorSpotlight />

      {/* 08. Verified Buyer Evidence */}
      <ReviewsCarousel />

      {/* 09. FAQ Accordion */}
      <FaqAccordion />
    </div>
  );
}
