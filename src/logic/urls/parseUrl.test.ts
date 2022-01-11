import { parseUrl } from './parseUrl';

describe('parseUrl', () => {
  it('should correctly parse out the origin, path, and queryParams of a url - origin defined', () => {
    const { origin, path, queryParams } = parseUrl('https://example.com/get-quotes/for/junk-removal?postal=12345');
    expect(origin).toEqual('https://example.com');
    expect(path).toEqual('/get-quotes/for/junk-removal');
    expect(queryParams).toEqual({ postal: '12345' });
  });
  it('should correctly parse out the origin, path, and queryParams of a url - origin not defined', () => {
    const { origin, path, queryParams } = parseUrl('/get-quotes/for/junk-removal?postal=12345');
    expect(origin).toEqual(null);
    expect(path).toEqual('/get-quotes/for/junk-removal');
    expect(queryParams).toEqual({ postal: '12345' });
  });
});
