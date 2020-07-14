'use strict';

const fs = require('fs');
const runner = require('child_process');

// const file = './public/vendor/gutenberg/wp-script-loader-packages.php';

// TODO: check if it's a file.
const file = './tmp/WordPress/wp-includes/assets/script-loader-packages.php';

runner.exec('php -r \'print json_encode(include("' + file + '"));\'', function(err, stdout, stderr) {
  const json = JSON.stringify(JSON.parse(stdout));
  fs.writeFile('./config/gutenberg/scripts.json', json, (err) => {
    // In case of a error throw err.
    if (err) {
      console.log(err);
      throw err;
    }
  });
});
