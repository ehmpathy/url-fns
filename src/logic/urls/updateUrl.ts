import { hydratePathParameters } from '../pathParams/hydratePathParameters';
import { evaluateRelativePath } from '../paths/evaluateRelativePath';
import { removeForwardSlashPrefix } from '../paths/removeForwardSlashPrefix';
import { stringifyQueryParams } from '../queryParams/stringifyQueryParams';
import { parseUrl } from './parseUrl';

/**
 * update an existing url with partial changes
 *
 * for example:
 * ```ts
 * import { updateUrl } from 'url-fns';
 *
 * const url = updateUrl({
 *   from: '/jobs/123/get-this-job?variant=b',
 *   with: {
 *     path: '../learn-more', // notice that this is a relative path
 *     queryParams: {
 *       focus: 'title',
 *     },
 *   },
 * });
 * expect(url).toEqual('/jobs/123/learn-more?variant=b&focus=title');
 * ```
 *
 * note:
 * - the `with.path` argument, optional, allows you to update the path of the url in two ways:
 *   - absolute replacement: if the `with.path` starts with `/`, it is assumed that you want to completely replace the path
 *   - relative replacement: if the `with.path` starts with `./` or `../`, it is assumed that you want a relative path update
 */
export const updateUrl = ({
  from: originalUrl,
  with: requestedChanges,
}: {
  from: string;
  with: { path?: string; queryParams?: Record<string, string | undefined>; pathParams?: Record<string, string> };
}) => {
  // parse the original url into query-params and path
  const { origin, path: originalPath, queryParams: originalQueryParams } = parseUrl(originalUrl);

  // apply the path change, if one was requested
  const path = (() => {
    // if no path changes requested, then no change
    if (!requestedChanges.path) return originalPath;

    // if an absolute path change was requested, then replace it
    if (requestedChanges.path.startsWith('/')) return requestedChanges.path;

    // if a relative path change was requested, then apply the relative change
    if (requestedChanges.path.startsWith('./') || requestedChanges.path.startsWith('../'))
      return evaluateRelativePath({ from: originalPath, to: requestedChanges.path });

    // otherwise, fail fast that this is not a supported operation
    throw new Error(
      `updateUrl with.path argument was invalid; must an absolute path (starts with '/') or relative path (starts with './' or '../'); got '${requestedChanges.path}'`,
    );
  })();

  // replace each path parameter with its value
  const pathWithPathParametersHydrated = hydratePathParameters({ path, pathParams: requestedChanges.pathParams ?? {} });

  // add the query params
  const fullQueryParams = { ...originalQueryParams, ...requestedChanges.queryParams };
  const stringifiedFullQueryParams = stringifyQueryParams(fullQueryParams);
  const pathWithAllParameters = stringifiedFullQueryParams
    ? `${pathWithPathParametersHydrated}?${stringifiedFullQueryParams}`
    : pathWithPathParametersHydrated;

  // add the origin if one existed
  const pathReadyForUrl = removeForwardSlashPrefix(pathWithAllParameters); // strip the leading `/` if it exists
  const url = origin ? `${origin}/${pathReadyForUrl}` : `/${pathReadyForUrl}`;

  // now return the built up url
  return url;
};
