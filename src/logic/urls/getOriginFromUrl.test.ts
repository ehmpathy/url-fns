import { getOriginFromUrl } from './getOriginFromUrl';

describe('getOriginFromUrl', () => {
  it('should be possible to get the origin from a url with one specified', () => {
    const origin = getOriginFromUrl('https://example.com/get-quotes/for');
    expect(origin).toEqual('https://example.com');
  });
  it('should be return null if the origin was not specified on the url', () => {
    const origin = getOriginFromUrl('/get-quotes/for');
    expect(origin).toEqual(null);
  });
  it('should be possible to get the origin from an origin with hyphens', () => {
    const origin = getOriginFromUrl(
      'https://example-origin.com/get-quotes/for',
    );
    expect(origin).toEqual('https://example-origin.com');
  });
});
