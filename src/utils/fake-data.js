const date = (new Date()).toISOString();

export const pageType = {
  id: 1,
  name: 'Pages', rest_base: 'pages', slug: 'page',
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
};

export const page = {
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
};

export const getMedias = (n = 3) => {
  return Array(n).fill().map((i, index) => {
    const id = index + 1;

    return {
      id,
      caption: { raw: '', rendered: '' },
      date_gmt: date,
      date,
      link: `${window.location.origin}/img${id}.png`,
      media_type: 'image',
      source_url: `${window.location.origin}/img${id}.png`,
      media_details: {
        file: '',
        height: 2100,
        image_meta: {},
        sizes: {},
        width: 3360,
      },
      title: { raw: '', rendered: '' },
    };
  });
};
