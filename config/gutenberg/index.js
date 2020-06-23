'use strict';

const fs = require('fs');
const AssetsQueue = require('./assets-queue.js');

const vendorScripts = require('./vendor.json');
const gutenbergStyles = require('./styles.json');

const vendorFolder = './public/vendor';
const gutenbergFolder = vendorFolder + '/gutenberg';

// Parses a given file and returns the dependencies list
// TODO
const getDepsFromFile = file => {
  let deps = [];

  if (fs.existsSync(file)) {
    deps = fs.readFileSync(file)
    .toString()
    .split('=>')[1]
    .split('array(')[1]
    .split('), \'version\'')[0]
    .replace(/,/g, '')
    .replace(/\'/g, '')
    .split(' ');
  }

  return deps;
};

// Returns the list of gutenberg packages and their dependencies
const getScriptsList = dir => {
  const files = fs.readdirSync(dir);
  const list = [];

  files.forEach(file => {
    // Get package name
    const name = file.split('.')[0];

    if (name.startsWith('wp-') && !list[name]) {
      const depFile = dir + '/' + name + '.asset.php';
      const dependencies = getDepsFromFile(depFile);

      list[name] = dependencies;
    }
  });

  return list;
};

// Get wp packages
const gutenbergScripts = getScriptsList(gutenbergFolder);

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
    depsScripts.enqueue(script,
      gutenbergFolder + '/' + script + '.min.js',
      gutenbergScripts[script]);
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

  return {
    scripts: depsScripts.getPaths(),
    styles: depsStyles.getPaths(),
  };
};
