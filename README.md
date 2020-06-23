# g-editor

A minimalist version of Gutenberg's editor. Ideal for checking your custom blocks.

``` bash
npm install @frontkom/g-editor
npm start
```

You can include your custom block by passing its path in `BLOCK_DIR` env var.

``` bash
BLOCK_DIR=\absolute\path\to\your-custom-block npm start
```

The editor expects that your custom block has an `index.js` and a `style.css` in its `build` folder.

```
your-custom-block
  ├── ...
  ├── build
  │  ├── index.js
  │  └── style.css
  └── ...
```


## g-editor and Gutenberg-js

Since version 1.0, `g-editor` no longer depends on `Gutenberg-js`.
It now includes the source `Gutenberg` packages directly.

## Current Gutenberg version

[v6.6.0](https://github.com/WordPress/gutenberg/releases/tag/v6.6.0)

(check original packages order [here](https://github.com/WordPress/WordPress/blob/master/wp-includes/script-loader.php))


## Assets

The sample videos are a courtesy of [Pixabay](https://pixabay.com/):

  * [https://pixabay.com/en/videos/cute-cat-funny-cat-kitten-domestic-3092/](https://pixabay.com/en/videos/cute-cat-funny-cat-kitten-domestic-3092/)
  * [https://pixabay.com/en/videos/cat-cat-thailand-small-indian-civet-1297/](https://pixabay.com/en/videos/cat-cat-thailand-small-indian-civet-1297/)
