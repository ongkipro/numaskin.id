import catalogData from '../../data/shopify_clean_catalog.json';

export interface ProductImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  selectedOptions?: Array<{ name: string; value: string }>;
  sku?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  category?: {
    id: string;
    name: string;
    fullName: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
  collections: string[];
  bpom?: string;
  netto?: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice?: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  } | null;
  featuredImage?: ProductImage;
  secondaryImage?: ProductImage;
  images: {
    nodes: ProductImage[];
  };
  variants: {
    nodes: ProductVariant[];
  };
  videoUrl?: string;
  videoAltText?: string;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: ProductImage;
}

const CLEAN_THUMBNAILS: Record<string, string> = {
  'numa-skin-deep-sea-water-facial-wash-100ml': '/images/products/clean-1x1/numa-skin-deep-sea-water-facial-wash-100ml-clean-1x1.webp',
  'numa-skin-calming-barrier-gloss-gel-moisturizer-30ml': '/images/products/clean-1x1/numa-skin-calming-barrier-gloss-gel-moisturizer-30ml-clean-1x1.webp',
  'numa-skin-deep-sea-water-treatment-lotion': '/images/products/clean-1x1/numa-skin-deep-sea-water-treatment-lotion-clean-1x1.webp',
  'numa-skin-adenosine-deep-sea-water-moisturizer-30g': '/images/products/clean-1x1/numa-skin-adenosine-deep-sea-water-moisturizer-30g-clean-1x1.webp',
  'numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g': '/images/products/clean-1x1/numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g-clean-1x1.webp',
  'numa-skin-oxydew-sunscreen-luceane-spf50-30ml': '/images/products/clean-1x1/numa-skin-oxydew-sunscreen-luceane-spf50-30ml-clean-1x1.webp',
  'numa-skin-nad-booster-anti-aging-serum-20ml': '/images/products/clean-1x1/numa-skin-nad-booster-anti-aging-serum-20ml-clean-1x1.webp',
  'numa-skin-paket-lengkap-6-in-1-routine': '/images/products/clean-1x1/numa-skin-paket-lengkap-6-in-1-routine-clean-1x1.webp',
};

// Normalize raw catalog product to Shopify Storefront API GraphQL shape
function normalizeProduct(raw: any, index: number, isBundle: boolean): Product {
  const rawImages: ProductImage[] = (raw.media || []).map((m: any) => ({
    url: m.url || (m.seo_filename ? `/images/seo/${m.seo_filename}` : '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg'),
    altText: m.alt_text || raw.title,
    width: 800,
    height: 800,
  }));

  const cleanThumbUrl = CLEAN_THUMBNAILS[raw.handle];
  const originalPrimary = raw.featuredImage || rawImages[0];

  const featuredImage: ProductImage = cleanThumbUrl
    ? {
        url: cleanThumbUrl,
        altText: `${raw.title} - Official Packshot`,
        width: 1080,
        height: 1080,
      }
    : (originalPrimary || {
        url: '/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg',
        altText: raw.title,
      });

  const secondaryImage: ProductImage = cleanThumbUrl && originalPrimary
    ? originalPrimary
    : (raw.secondaryImage || rawImages[1] || featuredImage);

  const images: ProductImage[] = cleanThumbUrl
    ? [featuredImage, ...rawImages.filter((img) => img.url !== cleanThumbUrl)]
    : rawImages;

  const variants: ProductVariant[] = (raw.variants || []).map((v: any, vIndex: number) => ({
    id: v.id || `gid://shopify/ProductVariant/${raw.handle}-${vIndex}`,
    title: v.title || 'Default Title',
    availableForSale: v.availableForSale !== undefined ? v.availableForSale : true,
    price: {
      amount: String(v.price || raw.price),
      currencyCode: 'IDR',
    },
    compareAtPrice: (v.compareAtPrice || raw.compareAtPrice) ? {
      amount: String(v.compareAtPrice || raw.compareAtPrice),
      currencyCode: 'IDR',
    } : null,
    sku: v.sku || `NUMA-${raw.handle.toUpperCase().slice(0, 10)}`,
  }));

  return {
    id: raw.id || `gid://shopify/Product/${isBundle ? 'bundle' : 'single'}-${index}`,
    title: raw.title,
    subtitle: raw.subtitle,
    handle: raw.handle,
    description: raw.metaDescription || raw.subtitle || '',
    descriptionHtml: raw.bodyHtml || `<p>${raw.subtitle || raw.title}</p>`,
    productType: raw.productType || (isBundle ? 'Skincare Set' : 'Perawatan Kulit'),
    category: raw.category || undefined,
    seoTitle: raw.seoTitle || raw.seo?.title || raw.title,
    seoDescription: raw.seoDescription || raw.seo?.description || raw.metaDescription || raw.subtitle || '',
    tags: raw.tags || [],
    collections: raw.collections || [],
    bpom: raw.bpom,
    netto: raw.netto,
    availableForSale: true,
    priceRange: {
      minVariantPrice: {
        amount: String(raw.price),
        currencyCode: 'IDR',
      },
    },
    compareAtPriceRange: raw.compareAtPrice ? {
      minVariantPrice: {
        amount: String(raw.compareAtPrice),
        currencyCode: 'IDR',
      },
    } : null,
    featuredImage,
    secondaryImage,
    images: {
      nodes: images.length > 0 ? images : [featuredImage],
    },
    variants: {
      nodes: variants,
    },
    videoUrl: (raw.media || []).find((m: any) => m.type === 'video')?.url || (
      raw.handle.includes('facial-wash') || raw.handle.includes('treatment-lotion')
        ? '/videos/numa-skin-deep-sea-water-ritual-desktop.mp4'
        : undefined
    ),
    videoAltText: (raw.media || []).find((m: any) => m.type === 'video')?.alt_text || `${raw.title} - Official Video`,
  };
}

// Master lists
const allSingles: Product[] = (catalogData.singles || []).map((s: any, i: number) => normalizeProduct(s, i, false));
const allBundles: Product[] = (catalogData.bundles || []).map((b: any, i: number) => normalizeProduct(b, i, true));
const allProducts: Product[] = [...allSingles, ...allBundles];

const allCollections: Collection[] = (catalogData.collections || []).map((c: any, i: number) => ({
  id: c.id || `gid://shopify/Collection/${i}`,
  title: c.title,
  handle: c.handle,
  description: c.description,
  seoTitle: c.seoTitle,
  seoDescription: c.seoDescription,
  image: c.image ? {
    url: c.image.url || c.image,
    altText: c.image.altText || c.title,
    width: c.image.width || 1500,
    height: c.image.height || 1000,
  } : {
    url: '/images/banners/04-category-banner-kategori-paket-awet-muda-banner.jpg',
    altText: c.title,
  },
}));

/**
 * Get all catalog products
 */
export function getAllProducts(): Product[] {
  return allProducts;
}

/**
 * Get 8 core singles
 */
export function getFeaturedSingles(): Product[] {
  return allSingles;
}

/**
 * Get 42 bundles
 */
export function getAllBundles(): Product[] {
  return allBundles;
}

/**
 * Find single product by handle
 */
export function getProductByHandle(handle: string): Product | undefined {
  return allProducts.find((p) => p.handle === handle);
}

/**
 * Get all collections
 */
export function getAllCollections(): Collection[] {
  return allCollections;
}

/**
 * Get collection by handle along with its products
 */
export function getCollectionByHandle(handle: string): { collection: Collection; products: Product[] } | undefined {
  const collection = allCollections.find((c) => c.handle === handle);
  const rawCollection = (catalogData.collections || []).find((c: any) => c.handle === handle);
  const isSpecialHandle = ['all', 'all-products', 'singles', 'bundles'].includes(handle);
  if (!collection && !isSpecialHandle) return undefined;

  let products: Product[] = [];
  if (rawCollection?.productHandles && rawCollection.productHandles.length > 0) {
    const handleSet = new Set(rawCollection.productHandles);
    products = rawCollection.productHandles
      .map((h: string) => allProducts.find((p) => p.handle === h))
      .filter((p: Product | undefined): p is Product => Boolean(p));
    
    const remaining = allProducts.filter((p) => p.collections.includes(handle) && !handleSet.has(p.handle));
    products.push(...remaining);
  } else if (handle === 'all' || handle === 'all-products') {
    products = allProducts;
  } else if (handle === 'paket-hemat-bundling' || handle === 'bundles') {
    products = allBundles;
  } else if (handle === 'singles') {
    products = allSingles;
  } else {
    products = allProducts.filter((p) => p.collections.includes(handle));
  }

  const resolvedCollection = collection || {
    id: `gid://shopify/Collection/${handle}`,
    title: handle === 'bundles' ? 'Paket Bundling' : handle === 'singles' ? 'Produk Satuan' : 'Semua Produk',
    handle: handle,
    description: 'Katalog lengkap rangkaian perawatan anti-aging dan hidrasi kulit Numa Skin.',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0826/9368/5494/collections/collection-semua-produk-banner.webp?v=1790485361',
      altText: 'Semua Produk Numa Skin',
    },
  };

  return { collection: resolvedCollection, products };
}

/**
 * Get the 4-step routine products
 * 01: Facial Wash
 * 02: Treatment Lotion (50ml & 150ml)
 * 03: NAD+ Booster Serum
 * 04: Adenosine Moisturizer
 */
export function getRoutineProducts(): Product[] {
  const handles = [
    'numa-skin-deep-sea-water-facial-wash-100ml',
    'numa-skin-deep-sea-water-treatment-lotion',
    'numa-skin-nad-booster-anti-aging-serum-20ml',
    'numa-skin-adenosine-deep-sea-water-moisturizer-30g',
  ];
  return handles.map((h) => getProductByHandle(h)).filter((p): p is Product => p !== undefined);
}

/**
 * Get 4 related products matching category, collection, or complementary routine
 */
export function getRelatedProducts(currentHandle: string, limit: number = 4): Product[] {
  const current = getProductByHandle(currentHandle);
  const candidates = allProducts.filter((p) => p.handle !== currentHandle);
  if (!current) return candidates.slice(0, limit);

  // 1. Same collection matches
  const byCollection = candidates.filter((p) =>
    p.collections.some((c) => current.collections.includes(c))
  );

  if (byCollection.length >= limit) {
    return byCollection.slice(0, limit);
  }

  // 2. Complementary products from singles/bundles
  const remaining = candidates.filter((p) => !byCollection.some((b) => b.handle === p.handle));
  return [...byCollection, ...remaining].slice(0, limit);
}

/**
 * Predictive search query (clamped strictly to 1..10)
 */
export function predictiveSearch(query: string, limit: number = 6): { products: Product[] } {
  const safeLimit = Math.min(10, Math.max(1, limit));
  if (!query || query.trim().length === 0) {
    return { products: allSingles.slice(0, safeLimit) };
  }

  const q = query.toLowerCase().trim();
  const matched = allProducts.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q))
    );
  });

  return { products: matched.slice(0, safeLimit) };
}

/**
 * Get all unique product tags across the store
 */
export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  allProducts.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
  return Array.from(tagsSet).sort();
}

/**
 * Get all product types
 */
export function getAllProductTypes(): string[] {
  const typesSet = new Set<string>();
  allProducts.forEach((p) => {
    if (p.productType) typesSet.add(p.productType);
  });
  return Array.from(typesSet).sort();
}

/**
 * Filter products by collection, tag, productType, and sort
 */
export function getProductsFiltered(options: {
  collection?: string;
  tag?: string;
  productType?: string;
  sort?: string;
}): Product[] {
  let list = allProducts;

  if (options.collection && options.collection !== 'all' && options.collection !== 'all-products') {
    if (options.collection === 'paket-hemat-bundling' || options.collection === 'bundles') {
      list = allBundles;
    } else if (options.collection === 'singles') {
      list = allSingles;
    } else {
      list = list.filter((p) => p.collections.includes(options.collection!));
    }
  }

  if (options.tag) {
    const qTag = options.tag.toLowerCase();
    list = list.filter((p) => p.tags.some((t) => t.toLowerCase() === qTag));
  }

  if (options.productType) {
    const qType = options.productType.toLowerCase();
    list = list.filter((p) => p.productType.toLowerCase() === qType);
  }

  // Sorting
  if (options.sort === 'price-asc') {
    list = [...list].sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
  } else if (options.sort === 'price-desc') {
    list = [...list].sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
  } else if (options.sort === 'title-asc') {
    list = [...list].sort((a, b) => a.title.localeCompare(b.title));
  }

  return list;
}
