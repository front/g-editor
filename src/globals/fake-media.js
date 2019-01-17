const date = (new Date()).toISOString();

// List of images
export const medias = [];

export function getMedia (id, type, src) {
  return {
    id,
    title: { raw: '', rendered: '' },
    caption: { raw: '', rendered: '' },
    date_gmt: date,
    date,
    media_type: 'image',
    mime_type: type || 'image/jpeg',
    source_url: src || `${window.location.origin}/img${id}.png`,
    // link: `${window.location.origin}/img${id}.png`,
    media_details: {
      file: '',
      width: 0,
      height: 0,
      image_meta: {},
      sizes: {},
    },
  };
}

export function createMedia (file) {
  return new Promise(resolve => {
    const reader = new window.FileReader();
    reader.onload = () => {
      // Create media and add to list
      const img = getMedia(medias.length + 1, file.type, reader.result);
      medias.push(img);
      resolve(img);
    };
    reader.readAsDataURL(file);
  });
}

// Load media
for(let i = 0; i < 3; i++) {
  medias.push(getMedia(i + 1));
}
