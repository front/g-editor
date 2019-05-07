
const $ = window.jQuery;
const oEditor = window.wp.editor;

const oldEditorFunctions = {
  initialize: (id, settings = { tinymce: true }) => {
    const defaults = window.wp.editor.getDefaultSettings();
    const init = $.extend({}, defaults.tinymce, settings.tinymce);

    init.selector = '#' + id;

    window.tinymce.init(init);

    if (! window.wpActiveEditor) {
      window.wpActiveEditor = id;
    }
  },

  autop: () => {},

  getContent: id => {
    const editor = window.tinymce.get(id);
    if (editor && ! editor.isHidden()) {
      editor.save();
    }

    return $('#' + id).val();
  },

  remove: id => {
    const mceInstance = window.tinymce.get(id);
    if (mceInstance) {
      if (! mceInstance.isHidden()) {
        mceInstance.save();
      }

      mceInstance.remove();
    }
  },

  removep: () => {},

  getDefaultSettings: () => ({
    tinymce: {
      indent: true,
      keep_styles: false,
      menubar: false,
      plugins: 'charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen',
      resize: 'vertical',
      skin: 'lightgray',
      theme: 'modern',
      toolbar1: 'bold,italic,bullist,numlist,link',
    },
    quicktags: {
      buttons: 'strong,em,link,ul,ol,li,code',
    },
  }),
};

const editor = {
  ...oEditor,
  ...oldEditorFunctions,
};

window.wp.editor = editor;
window.wp.oldEditor = oEditor;
