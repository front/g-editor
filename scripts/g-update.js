'use strict';

const fs = require('fs')

// Get updated list of dependencies
const packages = require('../config/gutenberg')();

const scripts = packages.scripts.reduce((html, script) => {
  if (!script.path) {
    return html;
  }

    return html + '<script id="' + script.name +  '" src="' + script.path.replace('./public', '') + '"></script>';
}, '');

const styles = packages.styles.reduce((html, style) => {
  if (!style.path) {
    return html;
  }

  return html + '<link rel="stylesheet" id="' + style.name +  '" href="' + style.path.replace('./public', '') + '"></link>';
}, '');

fs.writeFile('g-scripts.txt', scripts, (err) => {
  // In case of a error throw err.
  if (err) {
    console.log(err);
    throw err;
  }
});

fs.writeFile('g-styles.txt', styles, (err) => {
  // In case of a error throw err.
  if (err) {
    console.log(err);
    throw err;
  }
});
