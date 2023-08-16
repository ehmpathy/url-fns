import { hydratePathParameters } from '../pathParams/hydratePathParameters';
import { removeForwardSlashPrefix } from '../paths/removeForwardSlashPrefix';
import { stringifyQueryParams } from '../queryParams/stringifyQueryParams';
import { getOriginFromUrl } from './getOriginFromUrl';

/**
 * create a new url from its constituent parts
 *
 * for example:
 *
 * ```ts
 * import { createUrl } from 'url-fns';
 *
 * const url = createUrl({
 *   path: '/jobs/:jobSlug/get-this-job',
 *   pathParams: { jobSlug: '123' },
 *   queryParams: { variant: 'b' },
 * });
 * expect(url).toEqual('/jobs/123/get-this-job?variant=b');
 * ```
 */
export const createUrl = ({
  origin,
  path,
  pathParams = {},
  queryParams = {},
}: {
  origin?: string;
  path: string;
  pathParams?: Record<string, string>;
  queryParams?: Record<string, string>;
}): string => {
  // replace each path parameter with its value
  const pathWithPathParametersHydrate = hydratePathParameters({
    path,
    pathParams,
  });

  // append the query parameters, if any were defined
  const stringifiedQueryParams = stringifyQueryParams(queryParams);
  const pathWithAllParameters = stringifiedQueryParams
    ? `${pathWithPathParametersHydrate}?${stringifiedQueryParams}`
    : pathWithPathParametersHydrate;

  // add the origin if requested
  if (origin) {
    const foundOrigin = getOriginFromUrl(origin);
    if (foundOrigin !== origin)
      throw new Error(
        `createUrl origin argument was invalid. should be something like 'https://subdomain.yourdomain.com', got '${origin}'`,
      );
  }
  const pathReadyForUrl = removeForwardSlashPrefix(pathWithAllParameters); // strip the leading `/` if it exists
  const url = origin ? `${origin}/${pathReadyForUrl}` : `/${pathReadyForUrl}`;

  // now return the built up url
  return url;
};
