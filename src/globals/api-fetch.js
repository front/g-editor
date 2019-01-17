/* eslint no-cond-assign: off */
import { page, pageType, getMedias, themes } from './fake-data.js';

const medias = getMedias();

function getPage () {
  return JSON.parse(localStorage.getItem('g-editor-page')) || page;
}

function savePage (data) {
  const item = {
    ...getPage(),
    content: {
      raw: data.content,
      rendered: data.content.replace(/(<!--.*?-->)/g, ''),
    },
  };
  localStorage.setItem('g-editor-page', JSON.stringify(item));
}

function route (pattern, pathname) {
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


const apiFetch = options => {
  // console.log(options.path, options);

  let res = {}, rt;
  const { method, path, data } = options;
  const [ _path ] = path.split('?');

  // Types
  if(route('/wp/v2/types', _path)) {
    res = { page: pageType };
  }
  else if(route('/wp/v2/types/{type}', _path)) {
    res = { ...pageType };
  }

  // Pages
  else if(route('/wp/v2/pages', _path)) {
    res = [ getPage() ];
  }
  else if(route('/wp/v2/pages/{id}', _path) || route('/wp/v2/pages/{id}/autosaves', _path)) {
    if(method === 'PUT' && data) {
      savePage(options.data);
    }
    res = getPage();
  }

  // Media
  else if(route('/wp/v2/media', _path)) {
    if(method === 'OPTIONS') {
      res = {
        headers: {
          get (value) {
            if (value === 'allow') { return [ 'POST' ]; }
          },
        },
      };
    }
    else {
      res = medias;
    }
  }
  else if(rt = route('/wp/v2/media/{id}', _path)) {
    res = medias[+rt.id - 1];
  }

  // Themes
  else if(route('/wp/v2/themes', _path)) {
    res = themes;
  }

  else {
    console.warn('Unmatched route:', method || 'GET', path, data);
  }

  // console.log(res);
  return new Promise(resolve => { resolve(res); });
};

export default apiFetch;
