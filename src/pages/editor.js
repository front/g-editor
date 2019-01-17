import React from 'react';
import { data, editPost, domReady } from '@frontkom/gutenberg-js';

// Gutenberg JS Style
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/style.css';

class Editor extends React.Component {
  componentDidMount () {
    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: false,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: 'Insert your custom block',
      isRTL: false,
      autosaveInterval: 0,
      postLock: {
        isLocked: false,
      },
      canPublish: false,
      canSave: true,
      canAutosave: true,
      mediaLibrary: true,
    };

    // reset localStorage
    localStorage.removeItem('g-editor-page');

    // Disable tips
    data.dispatch('core/nux').disableTips();

    // Initialize the editor
    window._wpLoadGutenbergEditor = new Promise(function (resolve) {
      domReady(function () {
        resolve(editPost.initializeEditor('editor', 'page', 1, settings, {}));
      });
    });
  }

  render () {
    return <div id="editor" className="gutenberg__editor"></div>;
  }
}

export default Editor;
