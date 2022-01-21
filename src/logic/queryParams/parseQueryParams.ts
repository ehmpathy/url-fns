/**
 * parses a simple query parameter string into an object
 *
 * for example:
 * ```ts
 * import { parseQueryParams } from 'url-fns';
 *
 * const parsedQueryParams = parseQueryParams('variant=b&focus=title');
 * expect(parsedQueryParams).toEqual({ variant: 'b', focus: 'title' });
 * ```
 */
export const parseQueryParams = (queryParamsString: string) => {
  const keyEqualsValuesCombinations = queryParamsString.split('&').filter((str) => !!str);
  const queryParamEntries = keyEqualsValuesCombinations.map((combination) => {
    const [name, value] = combination.split('=');
    return [name, decodeURIComponent(value)];
  });
  const queryParams = Object.fromEntries(queryParamEntries);
  return queryParams;
};
