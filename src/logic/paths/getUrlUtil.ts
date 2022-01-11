import { URL as nodeURL } from 'url';

export const getUrlUtil = () => {
  if (window.URL) return window.URL;
  return nodeURL;
};
