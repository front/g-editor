import { getMedia } from './fake-media.js';


// Media stored on local database
let db;

const pDb = new Promise((resolve, reject) => {
  if(!('indexedDB' in window)) {
    return reject(new Error('This browser doesn\'t support IndexedDB'));
  }
  const req = window.indexedDB.open('g-editor-media', 1);

  req.onsuccess = ev => {
    db = ev.target.result;
    // console.log('Created/Opened database', db);
    resolve(db);
  };
  req.onerror = err => {
    console.error('Unable to create/open database', err);
    reject(err);
  };
  req.onupgradeneeded = ev => {
    const newDb = ev.target.result;
    newDb.createObjectStore('images', {
      keyPath: 'id',
      autoIncrement: true,
    });
    // console.log('DB Setup');
  };
});


// Store media files into the database
export async function storeMedia (file) {
  await pDb;

  return new Promise((resolve, reject) => {
    if(!db) {
      return reject(new Error('Sorry. Database is not working.'));
    }

    // const reader = new window.FileReader();
    // reader.onload = () => {

    const trans = db.transaction('images', 'readwrite');
    const req = trans.objectStore('images').add(file);

    req.onsuccess = async ev => {
      const id = ev.target.result;
      console.log('Media stored <', id);

      const savedMedia = await loadMedia(id);
      console.log('Saved <', savedMedia.source_url);

      resolve(savedMedia);
    };

    req.onerror = err => {
      console.log('Storing media failed', err);
      reject(err);
    };
    // };

    // reader.readAsDataURL(file);
    // reader.readAsBinaryString(file);
    // reader.readAsText(file);
  });
}


// Retrieve media files from the database
export async function loadMedia (id) {
  await pDb;
  console.log('Loading media >', id);

  return new Promise((resolve, reject) => {
    if(!db) {
      return reject(new Error('Sorry. Database is not working.'));
    }

    const trans = db.transaction('images', 'readonly');
    const req = trans.objectStore('images').get(id);

    req.onsuccess = ev => {
      const file = ev.target.result;
      // console.log('Media loaded', file);

      const data = {
        media_type: file.type.split('/')[0],
        mime_type: file.type,
        source_url: URL.createObjectURL(file),
      };

      console.log('Load result >', data);

      const media = getMedia(id, data);
      resolve(media);
    };

    req.onerror = err => {
      console.log('Loading media failed', err);
      reject(err);
    };
  });
}
