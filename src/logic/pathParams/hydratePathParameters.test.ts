import { hydratePathParameters } from './hydratePathParameters';

describe('hydratePathParameters', () => {
  it('should correctly hydrate path parameters which are defined mid path', () => {
    const hydratedPath = hydratePathParameters({ path: '/jobs/:jobSlug/show-more', pathParams: { jobSlug: '123', lotteryTicket: '821' } });
    expect(hydratedPath).toEqual('/jobs/123/show-more');
  });
  it('should correctly hydrate path parameters which are defined end of path', () => {
    const hydratedPath = hydratePathParameters({ path: '/jobs/:jobSlug', pathParams: { jobSlug: '123', lotteryTicket: '821' } });
    expect(hydratedPath).toEqual('/jobs/123');
  });
});
