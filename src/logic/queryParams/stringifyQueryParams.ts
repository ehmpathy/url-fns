/**
 * stringifies an object into url query parameter format
 *
 * for example:
 * ```ts
 * import { stringifyQueryParams } from 'url-fns';
 *
 * const stringifiedQueryParams = stringifyQueryParams({ variant: 'b', focus: 'title' });
 * expect(stringifiedQueryParams).toEqual('variant=b&focus=title');
 * ```
 */
export const stringifyQueryParams = (queryParams: Record<string, string | undefined>) => {
  const queryParamsWithoutUndefinedValues: Record<string, string> = JSON.parse(JSON.stringify(queryParams));
  const parts = Object.entries(queryParamsWithoutUndefinedValues).map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
  return parts.join('&');
};
