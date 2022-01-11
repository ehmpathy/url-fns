import { parseQueryParams } from '../queryParams/parseQueryParams';
import { getOriginFromUrl } from './getOriginFromUrl';

/**
 * reads a url string and parses it into path and query params
 */
export const parseUrl = (url: string) => {
  // split url into path and query params
  const [originAndPath, queryParamsString] = url.split('?');

  // parse the query params
  const queryParams = parseQueryParams(queryParamsString);

  // split the domain from path
  const origin = getOriginFromUrl(originAndPath);
  const path = origin ? originAndPath.replace(origin, '') : originAndPath;

  // return both parts
  return {
    origin,
    path,
    queryParams,
  };
};
