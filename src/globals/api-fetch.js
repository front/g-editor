/* eslint no-cond-assign: off */

import { pages, types, themes, taxonomies, categories, users } from './fake-data.js';
import { medias, createMedia } from './fake-media.js';


function getPage (type = 'page') {
  return JSON.parse(localStorage.getItem(`g-editor-${type}`)) || pages[type];
}

function savePage (data, type = 'page') {
  const item = {
    ...getPage(type),
    ...data,
    content: {
      raw: data.content,
      rendered: data.content.replace(/(<!--.*?-->)/g, ''),
    },
  };
  localStorage.setItem(`g-editor-${type}`, JSON.stringify(item));
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


const apiFetch = async options => {
  // console.log(options.path, options);

  let res = {}, rt;
  const { method, path, data } = options;
  const [ _path ] = path.split('?');

  // Types
  if(route('/wp/v2/types', _path)) {
    res = types;
  }
  else if(rt = route('/wp/v2/types/{type}', _path)) {
    res = types[rt.type];
  }

  // Pages
  else if(route('/wp/v2/pages', _path)) {
    res = [ getPage() ];
  }
  else if(route('/wp/v2/pages/{id}', _path) || route('/wp/v2/pages/{id}/autosaves', _path)) {
    if((method === 'POST' || method === 'PUT') && data) {
      savePage(options.data);
    }
    res = getPage();
  }

  // Posts
  else if(rt = route('/wp/v2/posts', _path)) {
    res = [ getPage('post') ];
  }
  else if(route('/wp/v2/posts/{id}', _path) || route('/wp/v2/posts/{id}/autosaves', _path)) {
    if((method === 'POST' || method === 'PUT') && data) {
      savePage(options.data, 'post');
    }
    res = getPage('post');
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
    else if(method === 'POST') {
      const file = options.body.get('file');
      res = file ? await createMedia(file) : {};
    }
    else {
      // console.log(medias.length);
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

  // Taxonomies
  else if(route('/wp/v2/taxonomies', _path)) {
    res = taxonomies;
  }
  else if(rt = route('/wp/v2/taxonomies/{name}', _path)) {
    res = taxonomies[rt.name];
  }

  // Categories
  else if(route('/wp/v2/categories', _path)) {
    res = categories;
  }

  // Users
  else if(route('/wp/v2/users', _path)) {
    res = users;
  }

  else {
    console.warn('Unmatched route:', method || 'GET', path, data);
  }

  // console.log(res);
  return res;
};

export default apiFetch;
