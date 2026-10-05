import faviconUrl from '~/assets/icons/favicon.ico';

export async function loader() {
  return Response.redirect(faviconUrl, 302);
}
