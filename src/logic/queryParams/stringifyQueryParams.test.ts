import { stringifyQueryParams } from './stringifyQueryParams';

describe('stringifyQueryParams', () => {
  it('should stringify correctly', () => {
    const stringifiedQueryParams = stringifyQueryParams({ variant: 'b', focus: 'title' });
    expect(stringifiedQueryParams).toEqual('variant=b&focus=title');
  });
  it('should preserve parameter order', () => {
    const stringifiedQueryParams = stringifyQueryParams({ c: 'c', z: 'z', a: 'a', d: 'd' });
    expect(stringifiedQueryParams).toEqual('c=c&z=z&a=a&d=d');
  });
  it('should return empty string if query params object was empty', () => {
    const stringifiedQueryParams = stringifyQueryParams({});
    expect(stringifiedQueryParams).toEqual('');
  });
  it('should not include keys for params where value was undefined', () => {
    const stringifiedQueryParams = stringifyQueryParams({ a: 'a', b: undefined, c: 'c' });
    expect(stringifiedQueryParams).toEqual('a=a&c=c');
  });
  it('should url encode special characters for url correctly', () => {
    const stringifiedQueryParams = stringifyQueryParams({
      email: 'bobs@youruncle.com',
      message: 'today was a good day; tomorrow, though! $l@y  !@#$%^&*()_. tomorrow = awesome`',
    });
    expect(stringifiedQueryParams).toEqual(
      'email=bobs%40youruncle.com&message=today%20was%20a%20good%20day%3B%20tomorrow%2C%20though!%20%24l%40y%20%20!%40%23%24%25%5E%26*()_.%20tomorrow%20%3D%20awesome%60',
    );
  });
});
