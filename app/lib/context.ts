import {createHydrogenContext} from '@shopify/hydrogen';
import {RouterContextProvider} from 'react-router';
import {AppSession} from '~/lib/session';
import * as mockCatalog from '~/lib/mock-catalog';

/**
 * Creates Hydrogen context for React Router v7 on Oxygen
 * Supports automatic fallback to mock catalog when Storefront API token is absent.
 */
export async function createHydrogenRouterContext(
  request: Request,
  env: any,
  executionContext: any,
) {
  const sessionSecret = env?.SESSION_SECRET || 'numaskin_default_dev_session_secret_32chars';
  const waitUntil = executionContext?.waitUntil ? executionContext.waitUntil.bind(executionContext) : () => {};

  let cache: any;
  try {
    // @ts-ignore
    cache = await caches.open('hydrogen');
  } catch (e) {
    cache = {
      match: async () => null,
      put: async () => {},
      delete: async () => false,
    };
  }

  const session = await AppSession.init(request, [sessionSecret]);
  const hasLiveToken = Boolean(env?.PUBLIC_STOREFRONT_API_TOKEN && env?.PUBLIC_STORE_DOMAIN);

  if (hasLiveToken) {
    return createHydrogenContext(
      {
        env,
        request,
        cache,
        waitUntil,
        session,
        i18n: {language: 'ID', country: 'ID'},
        cart: {},
      },
      {
        primaryDomain: env?.PRIMARY_DOMAIN || 'https://numaskin.id',
        checkoutDomain: env?.PUBLIC_CHECKOUT_DOMAIN || 'checkout.numaskin.id',
      },
    );
  }

  // --- DUMMY / MOCK STOREFRONT PROVIDER ---
  const mockStorefront = {
    CacheShort: () => ({ 'Cache-Control': 'max-age=60' }),
    CacheLong: () => ({ 'Cache-Control': 'max-age=3600' }),
    CacheCustom: () => ({ 'Cache-Control': 'max-age=300' }),
    getApiUrl: () => 'https://mock.shop/api',
    getShopifyDomain: () => 'https://numaskin.id',
    getHeaders: () => ({}),
    getPublicTokenHeaders: () => ({}),
    getPrivateTokenHeaders: () => ({}),
    isStorefrontApiUrl: (_req: any) => false,
    isMcpUrl: (_req: any) => false,
    forward: async (_req: Request) => new Response(null, {status: 404}),
    forwardMcp: async (_req: Request) => new Response(null, {status: 404}),
    setCollectedSubrequestHeaders: (_res: any) => {},
    i18n: {language: 'ID', country: 'ID'},
    isMock: true,
    async query(queryDoc: any, options: any = {}) {
      const queryStr = typeof queryDoc === 'string' ? queryDoc : (queryDoc?.loc?.source?.body || String(queryDoc));
      const vars = options?.variables || {};

      // Match Product Query
      if (vars.handle && (queryStr.includes('product(') || queryStr.includes('Product('))) {
        const product = mockCatalog.getProductByHandle(vars.handle);
        return { product };
      }

      // Match Collection Query
      if (vars.handle && (queryStr.includes('collection(') || queryStr.includes('Collection('))) {
        const result = mockCatalog.getCollectionByHandle(vars.handle);
        if (!result) return { collection: null };
        return {
          collection: {
            ...result.collection,
            products: {
              nodes: result.products,
              pageInfo: { hasNextPage: false, hasPreviousPage: false },
            },
          },
        };
      }

      // Match Collections List
      if (queryStr.includes('collections(')) {
        return {
          collections: {
            nodes: mockCatalog.getAllCollections(),
          },
        };
      }

      // Match Predictive Search
      if (queryStr.includes('predictiveSearch(') || vars.query !== undefined) {
        return mockCatalog.predictiveSearch(vars.query || '', vars.limit || 6);
      }

      // Default Homepage / Featured Query
      return {
        featuredSingles: { nodes: mockCatalog.getFeaturedSingles() },
        bundles: { nodes: mockCatalog.getAllBundles() },
        allProducts: { nodes: mockCatalog.getAllProducts() },
        routineProducts: { nodes: mockCatalog.getRoutineProducts() },
      };
    },
  };

  const routerContext = new RouterContextProvider();
  const contextData = {
    env: env || {},
    request,
    cache,
    waitUntil,
    session,
    i18n: {language: 'ID', country: 'ID'},
    storefront: mockStorefront,
    customerAccount: {
      isLoggedIn: async () => false,
      login: async () => new Response(null, {status: 302, headers: {Location: '/account'}}),
      logout: async () => new Response(null, {status: 302, headers: {Location: '/'}}),
      getAccessToken: async () => null,
      getBuyer: async () => null,
    },
    cart: {
      get: async () => null,
      linesAdd: async () => {},
      linesUpdate: async () => {},
      linesRemove: async () => {},
    },
  };

  return new Proxy(routerContext, {
    get(target: any, prop: any) {
      if (prop in target) {
        const val = target[prop];
        return typeof val === 'function' ? val.bind(target) : val;
      }
      return (contextData as any)[prop];
    },
    has(target: any, prop: any) {
      return prop in target || prop in contextData;
    },
    ownKeys(target: any) {
      return [...Reflect.ownKeys(target), ...Object.keys(contextData)];
    },
    getOwnPropertyDescriptor(target: any, prop: any) {
      if (prop in target) return Reflect.getOwnPropertyDescriptor(target, prop);
      if (prop in contextData) {
        return {
          enumerable: true,
          configurable: true,
          writable: false,
          value: (contextData as any)[prop],
        };
      }
    },
  });
}
