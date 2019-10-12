
import { getPage, savePage, deletePage } from './fake-data.js';
import { mediaList, createMedia } from './fake-media.js';

import users from '../data/users';
import taxonomies from '../data/taxonomies';
import categories from '../data/categories';
import tags from '../data/tags';
import types from '../data/types';
import themes from '../data/themes';


export default [
  // Pages and posts
  {
    path: '/wp/v2/pages',
    method: '*',
    handler () {
      return [ getPage() ];
    },
  },
  {
    path: [
      '/wp/v2/pages/{id}',
      '/wp/v2/pages/{id}/autosaves',
    ],
    method: ['POST', 'PUT'],
    handler ({ payload }) {
      savePage(payload);
      return getPage();
    },
  },
  {
    path: '/wp/v2/pages/{id}',
    method: 'DELETE',
    handler () {
      deletePage();
      return {};
    },
  },
  {
    path: [
      '/wp/v2/pages/{id}',
      '/wp/v2/pages/{id}/autosaves',
    ],
    method: '*',
    handler () {
      return getPage();
    },
  },

  {
    path: '/wp/v2/posts',
    method: '*',
    handler () {
      return [ getPage('post') ];
    },
  },
  {
    path: '/wp/v2/posts/{id}',
    method: 'DELETE',
    handler () {
      deletePage();
      return {};
    },
  },
  {
    path: [
      '/wp/v2/posts/{id}',
      '/wp/v2/posts/{id}/autosaves',
    ],
    method: ['POST', 'PUT'],
    handler ({ payload }) {
      savePage(payload);
      return getPage('post');
    },
  },
  {
    path: [
      '/wp/v2/posts/{id}',
      '/wp/v2/posts/{id}/autosaves',
    ],
    method: '*',
    handler () {
      return getPage('post');
    },
  },

  // Media
  {
    path: '/wp/v2/media',
    method: 'OPTIONS',
    handler () {
      return {
        headers: {
          get (value) {
            if (value === 'allow') { return [ 'POST' ]; }
          },
        },
      };
    },
  },
  {
    path: '/wp/v2/media',
    method: 'POST',
    async handler ({ payload }) {
      const file = payload.get('file');
      return file ? await createMedia(file) : {};
    },
  },
  {
    path: '/wp/v2/media',
    method: '*',
    handler () {
      return mediaList;
    },
  },
  {
    path: '/wp/v2/media/{id}',
    method: '*',
    handler ({ params }) {
      return mediaList[+params.id - 1];
    },
  },


  // Types
  {
    path: '/wp/v2/types',
    method: '*',
    handler () {
      return types;
    },
  },
  {
    path: '/wp/v2/types/{type}',
    method: '*',
    handler ({ params }) {
      return types[params.type] || {};
    },
  },

  // Blocks
  {
    path: '/wp/v2/blocks',
    method: '*',
    handler () {
      return [];
    },
  },

  // Themes
  {
    path: '/wp/v2/themes',
    method: '*',
    handler () {
      return themes;
    },
  },

  // Taxonomies
  {
    path: '/wp/v2/taxonomies',
    method: '*',
    handler () {
      return new window.Response(JSON.stringify(taxonomies));
    },
  },
  {
    path: '/wp/v2/taxonomies/{type}',
    method: '*',
    handler ({ params }) {
      return taxonomies[params.type] || {};
    },
  },

  // Categories
  {
    path: '/wp/v2/categories',
    method: 'GET',
    handler () {
      return new window.Response(JSON.stringify(categories));
    },
  },
  {
    path: '/wp/v2/categories',
    method: 'POST',
    handler ({ payload: { name } }) {
      return {
        id: window.lodash.random(1, 100000000),
        name,
      };
    },
  },

  // Tags
  {
    path: '/wp/v2/tags',
    method: 'GET',
    handler () {
      return new window.Response(JSON.stringify(tags));
    },
  },
  {
    path: '/wp/v2/tags',
    method: 'POST',
    handler ({ payload: { name } }) {
      return {
        id: window.lodash.random(1, 100000000),
        name,
      };
    },
  },
  
  // Users
  {
    path: '/wp/v2/users/',
    method: '*',
    handler () {
      return new window.Response(JSON.stringify(users));
    },
  },
  {
    path: '/wp/v2/users/{name}',
    method: '*',
    handler () {
      return users[0] || {};
    },
  },

  // Block renderer
  {
    path: '/wp/v2/block-renderer/{block*}',
    method: '*',
    handler ({ params }) {
      return {
        rendered: `<div>Sorry. There is no server-side rendering available for "${params.block}".</div>`,
      };
    },
  },

  // Search
  {
    path: '/wp/v2/search',
    method: '*',
    handler () {
      return [];
    },
  },
];
