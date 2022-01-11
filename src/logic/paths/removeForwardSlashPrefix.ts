/**
 * removes the `/` prefix, if it exists
 *
 * for example:
 * ```ts
 * const path = removeForwardSlashPrefix('/jobs/123');
 * expect(path).toEqual('jobs/123');
 * ```
 */
export const removeForwardSlashPrefix = (path: string) => path.replace(/^\//, '');
