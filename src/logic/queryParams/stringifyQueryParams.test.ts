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
});
