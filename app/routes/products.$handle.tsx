import { useLoaderData } from 'react-router';
import type { Route } from './+types/products.$handle';
import * as mockCatalog from '~/lib/mock-catalog';
import { calculateDiscount } from '~/lib/utils';
import { ProductBreadcrumb } from '~/components/product/ProductBreadcrumb';
import { ProductGallery } from '~/components/product/ProductGallery';
import { ProductPurchaseSuite } from '~/components/product/ProductPurchaseSuite';
import { ProductAccordions } from '~/components/product/ProductAccordions';
import { RelatedProductsSection } from '~/components/product/RelatedProductsSection';
import { StickyMobileCTA } from '~/components/product/StickyMobileCTA';

export const meta: Route.MetaFunction = ({ data }: { data: any }) => {
  if (!data?.product) {
    return [{ title: 'Produk Tidak Ditemukan - Numa Skin' }];
  }
  const p = data.product;
  const rawTitle = p.seoTitle || p.title;
  const title = rawTitle.toLowerCase().includes('numa skin')
    ? rawTitle
    : `${rawTitle} - Numa Skin Official`;
  const description =
    p.seoDescription ||
    p.description ||
    `${p.title} formula resmi Numa Skin terdaftar BPOM RI. Perawatan anti-aging dan hidrasi kulit berbahan aktif laut dalam.`;
  const canonicalUrl = `https://numaskin.id/products/${p.handle}`;
  const image = p.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg';
  const price = p.priceRange?.minVariantPrice?.amount || '0';
  const currency = p.priceRange?.minVariantPrice?.currencyCode || 'IDR';

  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    {
      tagName: 'link',
      rel: 'preload',
      as: 'image',
      href: image,
      // @ts-ignore
      fetchPriority: 'high',
    },

    // OpenGraph (Facebook / WhatsApp / iMessage)
    { property: 'og:site_name', content: 'Numa Skin Official' },
    { property: 'og:type', content: 'product' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    { property: 'og:image:alt', content: p.featuredImage?.altText || p.title },
    { property: 'og:price:amount', content: price },
    { property: 'og:price:currency', content: currency },
    { property: 'product:price:amount', content: price },
    { property: 'product:price:currency', content: currency },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  if (!handle) throw new Response('Not Found', { status: 404 });

  const product = mockCatalog.getProductByHandle(handle);
  if (!product) {
    throw new Response('Product Not Found', { status: 404 });
  }

  // Get matching routine recommendations
  const allSingles = mockCatalog.getFeaturedSingles();
  const upsellProduct = allSingles.find((p) => p.handle !== handle) || allSingles[0];

  // 4 Related Products
  const relatedProducts = mockCatalog.getRelatedProducts(handle, 4);

  return { product, upsellProduct, relatedProducts };
}

export default function ProductDetailPage() {
  const { product, upsellProduct, relatedProducts } = useLoaderData<typeof loader>();

  const currentPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const discountPercent = compareAtPrice ? calculateDiscount(currentPrice, compareAtPrice) : 0;

  const directCheckoutUrl = `https://y2x75f-40.myshopify.com/cart/${product.variants?.nodes?.[0]?.id?.split('/').pop() || ''}:1`;

  return (
    <div className="w-full bg-transparent pb-24 sm:pb-0 min-h-screen relative">
      {/* Schema.org Product Structured Data (Google Rich Results / Merchant) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            description: product.seoDescription || product.description,
            image: [product.featuredImage?.url],
            sku: product.variants?.nodes?.[0]?.sku || `NUMA-${product.handle.toUpperCase()}`,
            brand: {
              '@type': 'Brand',
              name: 'Numa Skin',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'IDR',
              price: product.priceRange.minVariantPrice.amount,
              availability: 'https://schema.org/InStock',
              url: `https://numaskin.id/products/${product.handle}`,
              seller: {
                '@type': 'Organization',
                name: 'Numa Skin Official',
              },
            },
          }),
        }}
      />
      
      {/* ========================================================= */}
      {/* 01. FIXED AMBIENT WATER VIDEO (Fixed down to footer)       */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden transform-gpu z-0">
        {/* Mobile Pure Water Ritual Video (9:16) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center sm:hidden opacity-45 transform-gpu will-change-transform"
        >
          <source src="/videos/numa-skin-deep-sea-water-ritual-mobile.webm" type="video/webm" />
          <source src="/videos/numa-skin-deep-sea-water-ritual-mobile.mp4" type="video/mp4" />
        </video>

        {/* Desktop Pure Water Ritual Video (16:9) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center hidden sm:block opacity-45 transform-gpu"
        >
          <source src="/videos/numa-skin-deep-sea-water-ritual-desktop.webm" type="video/webm" />
          <source src="/videos/numa-skin-deep-sea-water-ritual-desktop.mp4" type="video/mp4" />
        </video>

        {/* Soft Editorial Diffusion Gradients for High-Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F9FA]/85 via-[#F4F9FA]/60 to-[#F4F9FA]/80 pointer-events-none" />
        {/* Top Vignette (Menyatu halus dengan transparent header, desktop & mobile) */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#EBF5F8]/75 via-[#EBF5F8]/25 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FCFD]/70 to-transparent pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* 02. PRODUCT CONTENT (Hero Showcase + Related Products)     */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full pt-20 sm:pt-32 lg:pt-36">
        
        {/* Product Showcase Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation on Mobile (Above Gallery) */}
          <div className="lg:hidden pb-3">
            <ProductBreadcrumb product={product} />
          </div>

          {/* Main Split Layout: 50% Media Gallery / 50% Purchase Suite */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column (6 cols on Desktop): Media Gallery */}
            <div className="lg:col-span-6 xl:col-span-6">
              <ProductGallery product={product} discountPercent={discountPercent} />
            </div>

            {/* Right Column (6 cols on Desktop): Purchase Suite & Accordions */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start">
              {/* Breadcrumb Kicker on Desktop (Directly above title/BPOM, perfectly aligning with image top) */}
              <div className="hidden lg:block mb-3">
                <ProductBreadcrumb product={product} showCurrentTitle={false} />
              </div>
              <ProductPurchaseSuite product={product} upsellProduct={upsellProduct} />
              <ProductAccordions product={product} />
            </div>

          </div>
        </div>

        {/* Related Products Grid (Water video background shows smoothly behind) */}
        <RelatedProductsSection products={relatedProducts} />

      </div>

      {/* ========================================================= */}
      {/* 03. MOBILE STICKY ADD TO CART BAR                         */}
      {/* ========================================================= */}
      <StickyMobileCTA
        product={product}
        selectedPrice={currentPrice}
        onAddToCart={() => {
          if (typeof window !== 'undefined') {
            const defaultVariant = product.variants?.nodes?.[0];
            window.dispatchEvent(
              new CustomEvent('numa:add-to-cart', {
                detail: {
                  item: {
                    id: `cart-${Date.now()}`,
                    variantId: defaultVariant?.id || `gid://shopify/ProductVariant/${product.handle}-0`,
                    title: product.title,
                    handle: product.handle,
                    variantTitle: defaultVariant?.title,
                    price: currentPrice,
                    quantity: 1,
                    image: product.featuredImage?.url || '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg',
                  },
                },
              })
            );
          }
        }}
      />
    </div>
  );
}
