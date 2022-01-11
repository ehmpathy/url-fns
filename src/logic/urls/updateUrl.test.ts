import { updateUrl } from './updateUrl';

describe('updateUrl', () => {
  it('should be able to update a domain with a relative path', () => {
    const url = updateUrl({
      from: '/jobs/123/get-this-job?variant=b',
      with: {
        path: '../learn-more', // notice that this is a relative path
        queryParams: {
          focus: 'title',
        },
      },
    });
    expect(url).toEqual('/jobs/123/learn-more?variant=b&focus=title');
  });
  it('should be able to update a domain with an absolute path', () => {
    const url = updateUrl({
      from: '/jobs/123/get-this-job?variant=b&ref=google',
      with: {
        path: '/learn-more',
        queryParams: {
          variant: undefined,
        },
      },
    });
    expect(url).toEqual('/learn-more?ref=google');
  });
  it('should be able to update a domain with path params and query params', () => {
    const url = updateUrl({
      from: '/jobs/123/get-this-job?variant=b',
      with: {
        path: '../hire/:quoteSlug', // notice that this is a relative path
        pathParams: { quoteSlug: 'abc' },
        queryParams: {
          focus: 'title',
        },
      },
    });
    expect(url).toEqual('/jobs/123/hire/abc?variant=b&focus=title');
  });
  it('should be able to update a domain with origin', () => {
    const url = updateUrl({
      from: 'https://example.com/jobs/123/get-this-job?variant=b',
      with: {
        path: '../learn-more', // notice that this is a relative path
        queryParams: {
          focus: 'title',
        },
      },
    });
    expect(url).toEqual('https://example.com/jobs/123/learn-more?variant=b&focus=title');
  });
});
