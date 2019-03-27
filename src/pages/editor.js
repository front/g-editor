import React from 'react';
import { data, editPost, domReady, i18n } from '@frontkom/gutenberg-js';
import { types } from '../globals/fake-data';
import { getPage } from '../globals/api-fetch';

// Gutenberg JS Style
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/style.css';
import './editor.css';

const { __ } = i18n;

class Editor extends React.Component {
  constructor (props) {
    super(props);

    let type = window.location.pathname.replace(/\//g, '');
    type = type.slice(0, -1);

    this.state = {
      postType: type || 'page',
    };
  }

  componentDidMount () {
    const { postType } = this.state;

    const settings = {
      alignWide: true,
      availableTemplates: [],
      allowedBlockTypes: true,
      disableCustomColors: false,
      disablePostFormats: false,
      titlePlaceholder: 'Add title',
      bodyPlaceholder: __('Insert your custom block'),
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

    // Disable tips
    data.dispatch('core/nux').disableTips();

    // Initialize the editor
    window._wpLoadGutenbergEditor = new Promise(function (resolve) {
      domReady(function () {
        resolve(editPost.initializeEditor('editor', postType, 1, settings, {}));
      });
    });
  }

  resetLocalStorage = ev => {
    ev.preventDefault();

    localStorage.removeItem('g-editor-page');
    window.location.reload();
  };

  changePostType = (ev, type) => {
    ev.preventDefault();
    const slug = type.slice(0, -1);
    // update postType in localStorage before reload the editor
    const item = {
      ...getPage(slug),
      type: slug,
    };

    localStorage.setItem('g-editor-page', JSON.stringify(item));

    window.location.replace(type);
  };

  render () {
    const { postType } = this.state;

    return (
      <React.Fragment>
        <div className="editor-nav">
          {
            Object.keys(types).map(type => {
              return (
                <button
                  key={ type }
                  className={ `components-button ${type === postType ? 'is-primary' : ''}` }
                  onClick={ ev => this.changePostType(ev, types[type].rest_base) }
                >{ types[type].name }</button>
              );
            })
          }

          <button type="button" className="components-button is-tertiary"
            onClick={ this.resetLocalStorage }>{ __('Clear page and reload') }</button>
        </div>
        <div id="editor" className="gutenberg__editor"></div>
      </React.Fragment>
    );
  }
}

export default Editor;
