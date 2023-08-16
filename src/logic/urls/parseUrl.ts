import { parseQueryParams } from '../queryParams/parseQueryParams';
import { getOriginFromUrl } from './getOriginFromUrl';

/**
 * reads a url string and parses it into path and query params
 */
export const parseUrl = (
  url: string,
): {
  origin: string | null;
  path: string;
  queryParams: Record<string, string>;
  hash: string | null;
} => {
  // grab the hash, if one exists; do this first since hashes are at the end of urls (https://stackoverflow.com/a/34772568/3068233)
  const [beforeHash, hash] = url.split('#');

  // split url into path and query params
  const [originAndPath, queryParamsString] = beforeHash!.split('?') as [
    string,
    string | undefined,
  ];

  // parse the query params
  const queryParams = parseQueryParams(queryParamsString ?? '');

  // split the domain from path
  const origin = getOriginFromUrl(originAndPath);
  const path = origin ? originAndPath.replace(origin, '') : originAndPath;

  // return all parts
  return {
    origin,
    path,
    queryParams,
    hash: hash ?? null, // default to null
  };
};
