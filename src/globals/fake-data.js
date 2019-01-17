const date = (new Date()).toISOString();


// Post types and Pages
export const types = {
  page: {
    id: 1,
    name: 'Pages',
    rest_base: 'pages',
    slug: 'page',
    supports: {
      author: false,
      comments: false,
      'custom-fields': false,
      discussion: false,
      editor: true,
      excerpt: false,
      'page-attributes': false,
      revisions: false,
      thumbnail: false,
      title: false,
    },
    viewable: true,
  },
};

export const pages = [{
  id: 1,
  content: {
    raw: '',
    rendered: '',
  },
  date,
  date_gmt: date,
  title: {
    raw: 'Preview page',
    rendered: 'Preview page',
  },
  excerpt: {
    raw: '',
    rendered: '',
  },
  status: 'draft',
  revisions: { count: 0, last_id: 0 },
  parent: 0,
  theme_style: true,
  type: 'page',
  link: `${window.location.origin}/preview`,
  categories: [ ],
  featured_media: 0,
  permalink_template: `${window.location.origin}/preview`,
  preview_link: `${window.location.origin}/preview`,
  _links: {
    'wp:action-assign-categories': [],
    'wp:action-create-categories': [],
  },
}];


// Themes
export const themes = [{
  theme_supports: {
    formats: ['standard', 'aside', 'image', 'video', 'quote', 'link', 'gallery', 'audio'],
    'post-thumbanials': true,
    'responsive-embeds': false,
  },
}];


// Taxonomies and Categories
export const taxonomies = {
  category: {
    name: 'Categories',
    slug: 'category',
    description: '',
    types: [ 'post' ],
    hierarchical: true,
    rest_base: 'categories',
    _links: {
      collection: [], 'wp:items': [],
    },
  },
  post_tag: {
    name: 'Tags',
    slug: 'post_tag',
    description: '',
    types: [ 'post' ],
    hierarchical: false,
    rest_base: 'tags',
    _links: {
      collection: [], 'wp:items': [],
    },
  },
};

export const categories = [{
  id: 2,
  count: 3,
  description: 'Neque quibusdam nihil sequi quia et inventore dolorem dolores...',
  link: 'https://demo.wp-api.org/category/aut-architecto-nihil/',
  name: 'Aut architecto nihil',
  slug: 'aut-architecto-nihil',
  taxonomy: 'category',
  parent: 0,
  meta: [],
  _links: {
    self: [], collection: [], about: [], 'wp:post_type': [],
  },
}, {
  id: 11,
  count: 7,
  description: 'Rem recusandae velit et incidunt labore qui explicabo veritatis...',
  link: 'https://demo.wp-api.org/category/facilis-dignissimos/',
  name: 'Facilis dignissimos',
  slug: 'facilis-dignissimos',
  taxonomy: 'category',
  parent: 0,
  meta: [],
  _links: {
    self: [], collection: [], about: [], 'wp:post_type': [],
  },
}, {
  id: 1,
  count: 5,
  description: '',
  link: 'https://demo.wp-api.org/category/uncategorized/',
  name: 'Uncategorized',
  slug: 'uncategorized',
  taxonomy: 'category',
  parent: 0,
  meta: [],
  _links: {
    self: [], collection: [], about: [], 'wp:post_type': [],
  },
}];


// Users
export const users = [{
  id: 1,
  name: 'Human Made',
  url: '',
  description: '',
  link: 'https://demo.wp-api.org/author/humanmade/',
  slug: 'humanmade',
  avatar_urls: {
    24: 'http://2.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=24&d=mm&r=g',
    48: 'http://2.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=48&d=mm&r=g',
    96: 'http://2.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=96&d=mm&r=g',
  },
  meta: [],
  _links: {
    self: [], collection: [],
  },
}];
