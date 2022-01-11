import { URL } from 'url';
import { removeForwardSlashPrefix } from './removeForwardSlashPrefix';

/**
 * evaluate the absolute path to a relative path from a source absolute path
 *
 * for example:
 * ```ts
 * import { evaluateRelativeUrl } from 'url-fns';
 *
 * const url = evaluateRelativeUrlPath({ from: '/jobs/1234/check-status', to: '../get-this-job' });
 * expect(url).toEqual('/jobs/1234/get-this-job');
 * ```
 */
export const evaluateRelativePath = ({ from, to }: { from: string; to: string }) => {
  // assert that the `from` path is an absolute path (i.e., starts with `/`)
  if (!from.startsWith('/')) throw new Error(`evaluateRelativePath 'from' argument must be an absolute path. should start with '/', got '${from}'`);

  // now evaluate the url with the Url object
  const placeholderOrigin = 'https://test.com'; // an origin is required to work w/ the URL class
  const evaluatedUrl = new URL(`${placeholderOrigin}/${removeForwardSlashPrefix(from)}/${removeForwardSlashPrefix(to)}`);
  return evaluatedUrl.pathname;
};
