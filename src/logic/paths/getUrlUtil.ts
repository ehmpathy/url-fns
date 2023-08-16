import { URL as nodeURL } from 'url';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUrlUtil = () => {
  if (window.URL) return window.URL;
  return nodeURL;
};
