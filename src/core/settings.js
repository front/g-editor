
// User settings
window.userSettings = {
  secure: '',
  time: 1234567,
  uid: 1,
};

// API settings
const slash = '/';
window.wpApiSettings = {
  root: window.location.origin + slash,
  nonce: '123456789',
  versionString: 'wp/v2/',
};

// postboxes
window.postboxes = window.postboxes || {
  add_postbox_toggles: (page, args) => {
    console.log('page', page);
    console.log('args', args);
  },
};
