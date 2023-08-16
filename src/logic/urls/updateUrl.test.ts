import { updateUrl } from './updateUrl';

describe('updateUrl', () => {
  it('should be able to update a url with a relative path', () => {
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
  it('should be able to update a url with an absolute path', () => {
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
  it('should be able to update a url with path params and query params', () => {
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
  it('should be able to update a url with origin', () => {
    const url = updateUrl({
      from: 'https://example.com/jobs/123/get-this-job?variant=b',
      with: {
        path: '../learn-more', // notice that this is a relative path
        queryParams: {
          focus: 'title',
        },
      },
    });
    expect(url).toEqual(
      'https://example.com/jobs/123/learn-more?variant=b&focus=title',
    );
  });
  it('should be able to update a url without query params', () => {
    const url = updateUrl({
      from: 'https://example.com/jobs/123/check-on-status',
      with: {
        path: '../check-out', // notice that this is a relative path
      },
    });
    expect(url).toEqual('https://example.com/jobs/123/check-out');
  });
  it('should not produce double forward slashes in the path if updating url from root path', () => {
    const url = updateUrl({
      from: 'https://example.com/',
      with: {
        path: './check-out', // notice that this is a relative path
      },
    });
    expect(url).not.toContain('example.com//check-out');
    expect(url).toEqual('https://example.com/check-out');
  });
  it('should be able to add an origin to a url', () => {
    const url = updateUrl({
      from: '/jobs/123/get-this-job?referral-code=821',
      with: {
        origin: 'https://example.com',
        queryParams: {
          focus: 'title',
        },
      },
    });
    expect(url).toEqual(
      'https://example.com/jobs/123/get-this-job?referral-code=821&focus=title',
    );
  });
  it('should be able to update the origin of a url', () => {
    const url = updateUrl({
      from: 'https://example.com/jobs/123/get-this-job?referral-code=821',
      with: {
        origin: 'https://different.com',
        path: '/some/new/path',
        queryParams: {
          focus: 'title',
        },
      },
    });
    expect(url).toEqual(
      'https://different.com/some/new/path?referral-code=821&focus=title',
    );
  });
});
