/**
 * returns the origin from a url, or null if the url was not qualified with one
 *
 * for example:
 * - `https://yourdomain.com/some/path` => `https://yourdomain.com`
 * - `/some/path` => null
 */
export const getOriginFromUrl = (url: string) => {
  const [match] = new RegExp(/^https?:\/\/(?:(\w+)\.)+(\w+)(?::\d+)?/).exec(url) ?? [];
  if (!match) return null;
  return match;
};
