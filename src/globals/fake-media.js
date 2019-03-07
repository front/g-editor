const date = (new Date()).toISOString();
const origin = window.location.origin;

// List of images
export const mediaList = [];

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
    media_type: params.media_type,
    mime_type: params.mime_type,
    source_url: params.source_url,
    // link: params.source_url,
    media_details: {
      file: '',
      width: 0,
      height: 0,
      image_meta: {},
      sizes,
    },
  };
}


// Load media (images)
mediaList.push(getMedia(1, {
  media_type: 'image',
  mime_type: 'image/jpeg',
  source_url: `${origin}/img1.jpg`,
}));

mediaList.push(getMedia(2, {
  media_type: 'image',
  mime_type: 'image/jpeg',
  source_url: `${origin}/img2.jpeg`,
}));

mediaList.push(getMedia(3, {
  media_type: 'image',
  mime_type: 'image/png',
  source_url: `${origin}/img3.png`,
}));


// Load media (videos)
mediaList.push(getMedia(4, {
  media_type: 'video',
  mime_type: 'video/mp4',
  source_url: `${origin}/video1.mp4`,
  thumbnail: `${origin}/video1-thumb.jpg`,
}));

mediaList.push(getMedia(5, {
  media_type: 'video',
  mime_type: 'video/mp4',
  source_url: `${origin}/video2.mp4`,
  thumbnail: `${origin}/video2-thumb.jpg`,
}));


// Load media (audios)
mediaList.push(getMedia(6, {
  media_type: 'audio',
  mime_type: 'audio/mp3',
  source_url: `${origin}/audio1.mp3`,
  thumbnail: `${origin}/audio1-thumb.png`,
}));
