import { parseQueryParams } from './parseQueryParams';

describe('parseQueryParams', () => {
  it('should parse query params correctly', () => {
    const parsedQueryParams = parseQueryParams('variant=b&focus=title');
    expect(parsedQueryParams).toEqual({ variant: 'b', focus: 'title' });
  });
});
