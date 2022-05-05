/* eslint-disable prefer-destructuring */
import { RecordAny } from '../types';

type LocationOrUrl = Location | string | undefined;
export const getParams = (locationOrUrl: LocationOrUrl): RecordAny => {
  const result = {};
  let queryStr = '';
  if (!locationOrUrl) {
    // eslint-disable-next-line no-restricted-globals, no-param-reassign
    locationOrUrl = location;
  }
  if (typeof locationOrUrl === 'object') {
    const { pathname } = locationOrUrl as Location;
    if (locationOrUrl && locationOrUrl.search && locationOrUrl.search.length) {
      queryStr = (locationOrUrl.search as string).split('?')[1];
    } else if (pathname && pathname.split('?') && pathname.split('?')[1]) {
      queryStr = pathname.split('?')[1];
    }
  } else {
    queryStr = (locationOrUrl as string).split('?')[1];
  }
  if (queryStr && queryStr.length) {
    queryStr.split('&').forEach(param => {
      const arr = param.split('=');
      if (arr.length) {
        result[arr[0].trim()] = decodeURIComponent(arr[1].trim());
      }
    });
  }
  return result;
};

export const urlEncode = (params: RecordAny): string => {
  if (!params) return '';
  const entries = Object.entries(params);
  const arrayReduce = entries.reduce((result, entry) => {
    if (entry && entry[1] !== undefined) {
      const encodedEntry = [entry[0], encodeURIComponent(entry[1])];
      result.push(encodedEntry.join('='));
    }
    return result;
  }, []);
  return `?${arrayReduce.join('&')}`;
};
