read -p 'Wordpress tag (enter): ' tag_name

# Go to tmp folder
[[ -d tmp ]] || mkdir tmp
cd tmp

# Get wordpress
[[ -d WordPress ]] ||git clone git@github.com:WordPress/WordPress.git
cd WordPress

git fetch

if test "$tag_name" != ''; then
  git checkout -b $tag_name tags/$tag_name
else
  git checkout master
  git pull
fi

# Clean up
rm -rf ../../public/vendor/gutenberg/
mkdir ../../public/vendor/gutenberg/

# Copy gutenberg packages dependencies lists
cp wp-includes/assets/dist/* ../../public/vendor/gutenberg/

# Copy gutenberg packages js
cp wp-includes/js/dist/* ../../public/vendor/gutenberg/

# Add packages prefixes (ex: ally.js => wp-a11y.js)
cd ../../public/vendor/gutenberg/
for f in * ; do mv -- "$f" "wp-$f" ; done
cd -

# Copy vendor (lodash, react, etc)
cp -Rf wp-includes/js/dist/vendor/ ../../public/vendor/gutenberg/vendor

# Copy packages css
cp -Rf wp-includes/css/dist/ ../../public/vendor/gutenberg/styles/

# Add packages prefixes (ex: wp-block-editor)
cd ../../public/vendor/gutenberg/styles
for f in * ; do mv -- "$f" "wp-$f" ; done
