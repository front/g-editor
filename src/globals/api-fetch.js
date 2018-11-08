import { page, pageType, getMedias, themes } from './fake-data.js';

const medias = getMedias();

const apiFetch = options => {
  console.log(options.path, options);

  let res = {};
  let item = {};

  switch (options.path) {
    case '/wp/v2/types?context=edit':
      res = { page: pageType };
      break;
    case '/wp/v2/types/page?context=edit':
      res = { ...pageType };
      break;
    case '/wp/v2/pages/1?context=edit':
      res = JSON.parse(localStorage.getItem('g-editor-page')) || page;
      break;
    case '/wp/v2/pages/1/autosaves':
      item = JSON.parse(localStorage.getItem('g-editor-page')) || page;
      if (options.data) {
        item = {
          ...item,
          // update content
          content: {
            raw: options.data.content,
            rendered: options.data.content.replace(/(<!--.*?-->)/g, ''),
          },
        };

        localStorage.setItem('g-editor-page', JSON.stringify(item));
      }

      res = item;
      break;
    case '/wp/v2/media?context=edit':
      res = medias;
      break;
    case '/wp/v2/media':
      res = medias[Math.floor(Math.random() * medias.length) + 0];
      break;
    case '/wp/v2/themes?status=active':
      res = themes;
      break;
    default:
      break;
  }

  console.log(res);
  return new Promise(resolve => { resolve(res); });
};

export default apiFetch;
