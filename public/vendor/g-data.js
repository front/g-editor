(function (wp) {
  const { use, plugins } = wp.data;

  const uid = (window.userSettings && window.userSettings.uid) || 1;
  const storageKey = `WP_DATA_USER_${uid}`;

  use(plugins.persistence, { storageKey });
  use(plugins.controls);

})(window.wp);
