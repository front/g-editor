
// User settings
window.userSettings = window.userSettings || {
  secure: '',
  time: 1234567,
  uid: 1,
};

// API settings
window.wpApiSettings = window.wpApiSettings || {};
window.wpApiSettings.root = window.wpApiSettings.root || (window.location.origin + '/');
window.wpApiSettings.nonce = window.wpApiSettings.nonce || '123456789';
window.wpApiSettings.versionString = window.wpApiSettings.versionString || 'wp/v2/';

// postboxes
window.postboxes = window.postboxes || {
  add_postbox_toggles: (page, args) => {
    console.log('page', page);
    console.log('args', args);
  },
};
