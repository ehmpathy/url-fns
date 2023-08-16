import { createUrl } from './createUrl';

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
describe('createUrl', () => {
  it('should be able to build url without origin correctly', () => {
    const url = createUrl({
      path: '/jobs/:jobSlug/get-this-job',
      pathParams: { jobSlug: '123' },
      queryParams: { variant: 'b' },
    });
    expect(url).toEqual('/jobs/123/get-this-job?variant=b');
  });
  it('should be able to build url with origin correctly', () => {
    const url = createUrl({
      origin: 'https://yourdomain.com',
      path: '/jobs/:jobSlug/get-this-job',
      pathParams: { jobSlug: '123' },
      queryParams: { variant: 'b' },
    });
    expect(url).toEqual('https://yourdomain.com/jobs/123/get-this-job?variant=b');
  });
  it('should be able to build url with hyphens in origin correctly', () => {
    const url = createUrl({
      origin: 'https://appleid.cdn-apple.com',
      path: '/appleid/button/logo',
      queryParams: { size: '42' },
    });
    expect(url).toEqual('https://appleid.cdn-apple.com/appleid/button/logo?size=42');
  });
});
