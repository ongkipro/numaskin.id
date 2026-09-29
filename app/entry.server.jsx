import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {any} reactRouterContext
 * @param {any} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  reactRouterContext,
  context,
) {
  const url = new URL(request.url);
  const isPreview = url.hostname.includes('oxygen.net') || url.hostname.includes('tryhydrogen.dev');

  const body = await renderToReadableStream(
    <ServerRouter
      context={reactRouterContext}
      url={request.url}
    />,
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html; charset=utf-8');

  // Staging / Preview shielding & 404 security
  if (responseStatusCode === 404 || isPreview) {
    responseHeaders.set('X-Robots-Tag', 'noindex, nofollow');
  }

  // Edge Caching for fast load on Oxygen CDN (sub-50ms TTFB for public visits)
  if (
    request.method === 'GET' &&
    responseStatusCode === 200 &&
    !responseHeaders.has('Cache-Control') &&
    !request.headers.get('Cookie')?.includes('_session')
  ) {
    responseHeaders.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
  }

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
