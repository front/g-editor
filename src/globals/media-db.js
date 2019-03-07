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
    console.log('Created/Opened database', db);
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
    console.log('DB Setup');
  };
});


// Store media files into the database
export async function storeMedia (file) {
  await pDb;

  return new Promise((resolve, reject) => {
    if(!db) {
      return reject(new Error('Sorry. Database is not working.'));
    }

    const reader = new window.FileReader();
    reader.onload = () => {
      const data = {
        created: new Date(),
        media_type: file.type.split('/')[0],
        mime_type: file.type,
        source_url: reader.result,
      };

      const trans = db.transaction('images', 'readwrite');
      const req = trans.objectStore('images').add(data);

      req.onsuccess = ev => {
        const id = ev.target.result;
        console.log('Media stored', id);

        // data.source_url = 'https://www.hesdflkgsfkjdhlkjg.com/safa.jpg';
        // delete data.data;

        const media = getMedia(100 + id, data);
        resolve(media);
      };

      req.onerror = err => {
        console.log('Storing media failed', err);
        reject(err);
      };
    };

    reader.readAsDataURL(file);
    // reader.readAsBinaryString(file);
  });
}


// Retrieve media files from the database
export async function loadMedia (id) {
  await pDb;

  return new Promise((resolve, reject) => {
    if(!db) {
      return reject(new Error('Sorry. Database is not working.'));
    }

    const trans = db.transaction('images', 'readonly');
    const req = trans.objectStore('images').get(id - 100);

    req.onsuccess = ev => {
      const data = ev.target.result;
      console.log('Media loaded', data);

      const media = getMedia(100 + id, data);
      resolve(media);
    };

    req.onerror = err => {
      console.log('Loading media failed', err);
      reject(err);
    };
  });
}
