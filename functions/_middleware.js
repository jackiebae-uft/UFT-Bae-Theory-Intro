const CANONICAL_ORIGIN = "https://uft-bae-theory.com";
const PAGES_HOST_SUFFIX = "uft-bae-theory-intro.pages.dev";
const ORIGIN_HEADER = "x-uft-intro-origin";
const ORIGIN_HEADER_VALUE = "path-router-v1";

export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);
  const isPagesHost =
    requestUrl.hostname === PAGES_HOST_SUFFIX ||
    requestUrl.hostname.endsWith(`.${PAGES_HOST_SUFFIX}`);
  const isRouterOriginRequest =
    context.request.headers.get(ORIGIN_HEADER) === ORIGIN_HEADER_VALUE;

  if (isPagesHost && !isRouterOriginRequest) {
    const canonicalUrl = new URL(CANONICAL_ORIGIN);
    canonicalUrl.pathname = `/intro${requestUrl.pathname}`;
    canonicalUrl.search = requestUrl.search;
    return Response.redirect(canonicalUrl.toString(), 308);
  }

  return context.next();
}
