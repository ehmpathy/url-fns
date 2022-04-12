import { parseUrl } from './parseUrl';

describe('parseUrl', () => {
  it('should correctly parse url - origin, query-params, no hash', () => {
    const { origin, path, queryParams, hash } = parseUrl('https://example.com/get-quotes/for/junk-removal?postal=12345');
    expect(origin).toEqual('https://example.com');
    expect(path).toEqual('/get-quotes/for/junk-removal');
    expect(queryParams).toEqual({ postal: '12345' });
    expect(hash).toEqual(null);
  });
  it('should correctly parse url - no origin, query-params, no hash', () => {
    const { origin, path, queryParams, hash } = parseUrl('/get-quotes/for/junk-removal?postal=12345');
    expect(origin).toEqual(null);
    expect(path).toEqual('/get-quotes/for/junk-removal');
    expect(queryParams).toEqual({ postal: '12345' });
    expect(hash).toEqual(null);
  });
  it('should correctly parse url - origin, query-params, hash', () => {
    const { origin, path, queryParams, hash } = parseUrl('https://example.com/get-quotes/for/junk-removal?postal=12345#open-menu');
    expect(origin).toEqual('https://example.com');
    expect(path).toEqual('/get-quotes/for/junk-removal');
    expect(queryParams).toEqual({ postal: '12345' });
    expect(hash).toEqual('open-menu');
  });
  it('should correctly parse url - origin, no query-params, hash', () => {
    const { origin, path, queryParams, hash } = parseUrl('https://example.com/get-quotes/for/junk-removal#open-menu');
    expect(origin).toEqual('https://example.com');
    expect(path).toEqual('/get-quotes/for/junk-removal');
    expect(queryParams).toEqual({});
    expect(hash).toEqual('open-menu');
  });
});
