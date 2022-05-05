import pathToRegexp from 'path-to-regexp';

const cache = {};
const cacheLimit: number = 10000;
let cacheCount = 0;

interface CompileOptions {
  end?: boolean;
  strict?: boolean;
  sensitive?: boolean;
}

function compilePath(path: string, options: CompileOptions) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

  if (pathCache[path]) return pathCache[path];

  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount += 1;
  }

  return result;
}

interface MatchOptions {
  path?: string | string[];
  end?: boolean;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
}

type Options = MatchOptions | string | string[];

export interface matchPathValues {
  path: string;
  url: string;
  isExact: boolean;
  params: Record<string, unknown>;
}

function matchPath(pathname: string, options: Options = {}): matchPathValues {
  let result: Options = {};
  if (typeof options === 'string' || Array.isArray(options)) {
    result = { path: options };
  } else {
    result = options;
  }

  const { path: p, end, exact = false, strict = false, sensitive = false } = result;

  const paths = [].concat(p);

  return paths.reduce((matched, path) => {
    if (!path && path !== '') return null;
    if (matched) return matched;

    const { regexp, keys } = compilePath(path, {
      end: end || exact,
      strict,
      sensitive
    });
    const match = regexp.exec(pathname);

    if (!match) return null;

    const [url, ...values] = match;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path,
      url: path === '/' && url === '' ? '/' : url,
      isExact,
      params: keys.reduce((memo, key, index) => {
        // 直接修改 memo lint 不通过
        const temp = { ...memo };
        temp[key.name] = values[index];
        return temp;
      }, {})
    };
  }, null);
}

export default matchPath;
