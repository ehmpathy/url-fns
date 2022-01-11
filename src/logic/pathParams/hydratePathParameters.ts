/**
 * https://stackoverflow.com/a/9310752/3068233
 */
const escapeRegExp = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

/**
 * hydrates the path parameters in a path by replacing each parameter found in the path with its defined value
 */
export const hydratePathParameters = ({ path, pathParams }: { path: string; pathParams: Record<string, string> }) => {
  return Object.entries(pathParams).reduce((pathNow, [pathParameterName, pathParameterValue]) => {
    return pathNow
      .replace(new RegExp(`/:${escapeRegExp(pathParameterName)}/`, 'g'), `/${pathParameterValue}/`)
      .replace(new RegExp(`/:${escapeRegExp(pathParameterName)}$`, 'g'), `/${pathParameterValue}`);
  }, path);
};
