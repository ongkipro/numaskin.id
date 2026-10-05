import appleTouchIconUrl from '~/assets/icons/apple-touch-icon.png';

export async function loader() {
  return Response.redirect(appleTouchIconUrl, 302);
}
