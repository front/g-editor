/* eslint-disable import/named */
import React from 'react';
import types from '../data/types';
import { changeType } from '../globals/fake-data';

import './editor.scss';

const { data, editPost, domReady } = window.wp;

class Editor extends React.Component {
  constructor(props) {
    super(props);

    let type = window.location.pathname.replace(/\//g, '');
    type = type.slice(0, -1);

    this.state = {
      postType: type || 'page',
    };
  }

  componentDidMount() {
    const { postType } = this.state;

    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: false,
      disableCustomFontSizes: false,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: 'Insert your custom block',
      isRTL: false,
      autosaveInterval: 3,
      style: [],
      imageSizes: [],
      richEditingEnabled: true,
      postLock: {
        isLocked: false,
      },
      postLockUtils: {
        nonce: '123456789',
      },
      enableCustomFields: true,
      mediaLibrary: true,
    };

    // Disable publish sidebar
    data.dispatch('core/editor').disablePublishSidebar();

    // Disable tips
    data.dispatch('core/nux').disableTips();

    // Initialize the editor
    window._wpLoadBlockEditor = new Promise(resolve => {
      domReady(() => {
        resolve(editPost.initializeEditor('editor', postType, 1, settings, {}));
      });
    });
  }

  resetLocalStorage = ev => {
    ev.preventDefault();

    localStorage.removeItem('g-editor-page');
    sessionStorage.removeItem('wp-autosave-block-editor-post-1');
    window.location.reload();
  };

  changePostType = (ev, type) => {
    ev.preventDefault();
    // update postType in localStorage before reload the editor
    const slug = type.slice(0, -1);
    changeType(slug);

    window.location.replace(type);
  };

  render() {
    const { postType } = this.state;

    return (
      <>
        <div className="editor-nav">
          {['post', 'page'].map(type => (
            // eslint-disable-next-line react/button-has-type
            <button
              key={type}
              className={`components-button ${type === postType ? 'is-primary' : ''}`}
              onClick={ev => this.changePostType(ev, types[type].rest_base)}
            >
              {types[type].name}
            </button>
          ))}

          <button
            type="button"
            className="components-button is-tertiary"
            onClick={this.resetLocalStorage}
          >
            Clear page and reload
          </button>
        </div>
        <div id="editor" className="gutenberg__editor" />
      </>
    );
  }
}

export default Editor;
