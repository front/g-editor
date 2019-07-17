'use strict';

const fs = require('fs');
const path = require('path');

const blockDir = process.env.BLOCK_DIR || false;

module.exports = function getBlockVars () {
  // Check if a directory was passed as an env var
  if(!blockDir || !fs.lstatSync(blockDir).isDirectory()) {
    return {};
  }

  // Extract the content of a file as a string
  const getFileContents = file =>
    fs.existsSync(file) && fs.lstatSync(file).isFile()
      ? fs.readFileSync(file).toString()
      : undefined;

  // Read the block config (if exists)
  const blockPkg = getFileContents(path.resolve(blockDir, 'package.json'));
  const config = blockPkg && JSON.parse(blockPkg).gutenbergCloud;


  // Extract the file name from the block config or set a default
  function getFileName (name, oldName, defName) {
    const file = config && (config[name] || config[oldName]);
    return file ? path.resolve(blockDir, file) : path.resolve(blockDir, 'build', defName);
  }

  // Get the file names to be loaded
  const editorJs = getFileName('editor-js', 'js', 'index.js');
  const viewCss  = getFileName('view-css', 'css',  'style.css');
  const editorCss = getFileName('editor-css', 'editor', 'editor.css');
  const viewJs = getFileName('view-js', 'scripts', 'scripts.js');


  // Load the block files
  const blockVars = {};

  blockVars.blockScript = getFileContents(editorJs);
  blockVars.blockStyle = getFileContents(viewCss);
  blockVars.blockEditorStyle = getFileContents(editorCss);
  const blockViewScript = getFileContents(viewJs);
  blockVars.blockViewScript = blockViewScript && Buffer.from(blockViewScript).toString('base64');

  return blockVars;
};
