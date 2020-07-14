'use strict';

const AssetsQueue = require('./assets-queue.js');

const vendorScripts = require('./vendor.json');
const gutenbergScripts = require('./scripts.json');
const gutenbergStyles = require('./styles.json');

const vendorFolder = './public/vendor';
const gutenbergFolder = vendorFolder + '/gutenberg';

module.exports = function getGutenbergAssets () {
  const depsScripts = new AssetsQueue();
  const depsStyles = new AssetsQueue();

  // Enqueue vendor js
  for (const script in vendorScripts) {
    depsScripts.enqueue(script,
      gutenbergFolder + '/vendor/' + script + '.min.js',
      vendorScripts[script]);
  }

  // Enqueue local js
  depsScripts.enqueue('no-conflict',
    vendorFolder + '/no-conflict.js',
    ['lodash']);

  depsScripts.enqueue('g-data',
    vendorFolder + '/g-data.js',
    ['wp-data']);

  // Enqueue wp-packages js
  for (const script in gutenbergScripts) {
    // depsScripts.enqueue(script,
    //   gutenbergFolder + '/' + script + '.min.js',
    //   gutenbergScripts[script]);

    const name = 'wp-' + script.replace('.js', '');
    // console.log(name);
    // console.log(gutenbergFolder + '/' + name + '.min.js');
    // console.log(gutenbergScripts[script].dependencies);

    depsScripts.enqueue(name,
      gutenbergFolder + '/' + name + '.min.js',
      gutenbergScripts[script].dependencies);
  }

  // Enqueue style
  depsStyles.enqueue('wp-block-library-theme',
    gutenbergFolder + '/styles/wp-block-library/theme.min.css',
    []);

  depsStyles.enqueue('wp-edit-blocks',
    gutenbergFolder + '/styles/wp-block-library/editor.min.css',
    ['wp-components', 'wp-editor', 'wp-block-library', 'wp-block-library-theme']);

  for (const style in gutenbergStyles) {
    const name = `wp-${style}`;
    depsStyles.enqueue(name,
      gutenbergFolder + '/styles/' + name + '/style.min.css',
      gutenbergStyles[style]);
  }

  // console.log(depsScripts.getPaths());
  return {
    scripts: depsScripts.getPaths(),
    styles: depsStyles.getPaths(),
  };
};
