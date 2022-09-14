import { evaluateRelativePath } from './evaluateRelativePath';

describe('evaluateRelativePath', () => {
  it('should correctly evaluate a relative path that just adds onto the url', () => {
    const path = evaluateRelativePath({ from: '/jobs/123', to: './check-on-status' });
    expect(path).toEqual('/jobs/123/check-on-status');
  });
  it('should correctly evaluate a relative path that changes the directory', () => {
    const path = evaluateRelativePath({ from: '/jobs/123/check-on-status', to: '../get-this-job' });
    expect(path).toEqual('/jobs/123/get-this-job');
  });
  it('should correctly evaluate a relative path that builds upon root path', () => {
    const path = evaluateRelativePath({ from: '/', to: './get-this-job' });
    expect(path).toEqual('/get-this-job');
  });
});
