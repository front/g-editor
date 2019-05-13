
import { getPage, savePage } from './fake-data.js';
import { mediaList, createMedia } from './fake-media.js';

import users from '../data/users';
import taxonomies from '../data/taxonomies';
import categories from '../data/categories';
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
      return taxonomies;
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
    method: '*',
    handler () {
      return categories;
    },
  },

  // Users
  {
    path: '/wp/v2/users/',
    method: '*',
    handler () {
      return users;
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
];
