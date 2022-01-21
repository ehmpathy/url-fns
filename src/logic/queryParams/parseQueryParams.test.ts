import { parseQueryParams } from './parseQueryParams';

describe('parseQueryParams', () => {
  it('should parse query params correctly', () => {
    const parsedQueryParams = parseQueryParams('variant=b&focus=title');
    expect(parsedQueryParams).toEqual({ variant: 'b', focus: 'title' });
  });
  it('should decode special characters from url correctly', () => {
    const parsedQueryParams = parseQueryParams(
      'email=bobs%40youruncle.com&message=today%20was%20a%20good%20day%3B%20tomorrow%2C%20though!%20%24l%40y%20%20!%40%23%24%25%5E%26*()_.%20tomorrow%20%3D%20awesome%60',
    );
    expect(parsedQueryParams).toEqual({
      email: 'bobs@youruncle.com',
      message: 'today was a good day; tomorrow, though! $l@y  !@#$%^&*()_. tomorrow = awesome`',
    });
  });
});
