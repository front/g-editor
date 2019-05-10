const path = require('path');
const fs = require('fs-extra');

(async () => {
  if(!await fs.pathExists('gutenberg')) {
    return console.log('Error: Gutenberg source folder is not present.');
  }

  const depList = [];

  // Read the folder structure and map the dependency tree
  async function getDeps (dep) {
    const pkgDeps = await fs.readFile(path.resolve('gutenberg', dep, 'index.deps.json'));
    const localDeps = JSON.parse(pkgDeps);

    for(const d of localDeps) {
      if(d.startsWith('wp-') && d !== 'wp-polyfill' && !depList.includes(d.substr(3))) {
        await getDeps(d.substr(3));
      }
    }
    if(!depList.includes(dep)) {
      depList.push(dep);
    }
  }

  const dir = await fs.readdir(path.resolve('gutenberg'));
  for(const d of dir) {
    if(!d.includes('.')) {
      await getDeps(d);
    }
  }

  // Concat the js and css files
  async function getFileContents (pathname) {
    if(await fs.pathExists(pathname)) {
      return await fs.readFile(pathname);
    }
    return '';
  }

  async function getScriptAndStyles (dep) {
    const script = await getFileContents(path.resolve('gutenberg', dep, 'index.js'));
    const style = await getFileContents(path.resolve('gutenberg', dep, 'style.css')) +
      await getFileContents(path.resolve('gutenberg', dep, 'editor.css')) +
      await getFileContents(path.resolve('gutenberg', dep, 'editor-styles.css')) +
      await getFileContents(path.resolve('gutenberg', dep, 'theme.css'));

    return [script, style];
  }

  let script = '', style = '';
  for(const d of depList) {
    const [js, css] = await getScriptAndStyles(d);
    script += js && `/*\n* wp-${d}\n*/\n${js}\n`;
    style += css && `/*\n* wp-${d}\n*/\n${css}\n`;
  }

  // Write to file
  await fs.writeFile(path.resolve('public', 'vendor', 'wp-gutenberg.js'), script);
  await fs.writeFile(path.resolve('public', 'vendor', 'wp-gutenberg.css'), style);

  console.log('Gutenberg vendor files compiled.');
})();
