
import routes from './api-routes';


function mathRoute (pattern, pathname) {
  const res = {};
  const r = pattern.split('/'), l = r.length, p = pathname.split('/');
  let i = 0;
  for(; i < l; i++) {
    if(r[i] === p[i]) {
      continue;
    }
    if(r[i].charAt(0) === '{' && r[i].charAt(r[i].length - 1) === '}' && p[i]) {
      res[r[i].substring(1, r[i].length - 1)] = p[i];
      continue;
    }
    return false;
  }
  if(p[i]) {
    return false;
  }
  return res;
}

function matchRouteList (options, pathname) {
  if(typeof options === 'string') {
    return mathRoute(options, pathname);
  }

  for(const pattern of options) {
    const params = mathRoute(pattern, pathname);
    if(params) {
      return params;
    }
  }
  return false;
}

function matchMethod (source, target) {
  return !target || target === source || target.includes(source);
}

function parseQS (qs) {
  return qs.split('&').reduce((a, i, p) => {
    p = i.split('=');
    a[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
    return a;
  }, {});
}


const apiFetch = options => {
  const { method = 'GET', path, data, body } = options;
  const [ pathname, _qs ] = path.split('?');
  const query = parseQS(_qs);
  const payload = data || body;

  // console.log(method, pathname);

  for(const r of routes) {
    const params = matchRouteList(r.path, pathname);
    if(params) {
      if(matchMethod(method, r.method)) {
        return r.handler({
          method, pathname, params, query, payload,
        });
      }
    }
  }

  console.error('Unmatched route:', method, path, payload);
  return {};
};

export default apiFetch;
