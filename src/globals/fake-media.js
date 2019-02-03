const date = (new Date()).toISOString();

// List of images
export const medias = [];

export function getMedia (id, params = {}) {
  const sizes = {};

  if (params.thumbnail) {
    sizes.thumbnail = {
      source_url: params.thumbnail,
    };
  }

  return {
    id,
    title: { raw: '', rendered: '' },
    caption: { raw: '', rendered: '' },
    date_gmt: date,
    date,
    media_type: params.media_type || 'image',
    mime_type: params.mime_type || 'image/jpeg',
    source_url: params.source_url || `${window.location.origin}/img${id}.png`,
    // link: `${window.location.origin}/img${id}.png`,
    media_details: {
      file: '',
      width: 0,
      height: 0,
      image_meta: {},
      sizes,
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

// Load media (images)
for(let i = 0; i < 3; i++) {
  medias.push(getMedia(i + 1));
}

// Load media (videos)
medias.push(getMedia(5, {
  media_type: 'video',
  mime_type: 'video/mp4',
  source_url: `${window.location.origin}/video1.mp4`,
  thumbnail: 'https://i.vimeocdn.com/video/570251592_640x360.jpg',
}));

medias.push(getMedia(6, {
  media_type: 'video',
  mime_type: 'video/mp4',
  source_url: `${window.location.origin}/video2.mp4`,
  thumbnail: 'https://i.vimeocdn.com/video/543433483_640x360.jpg',
}));
