import React from 'react';
import { getPage } from '../globals/fake-data';

const { domReady } = window.wp;


class Preview extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      rendered: '',
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount () {
    // remove block editor style from page
    const editorStyle = document.querySelector('style[id="block-editor-style"]');
    if (editorStyle) {
      editorStyle.remove();
    }

    // remove editor style
    const style = document.querySelector('link[href$="css/gutenberg/style.css"]');
    if (style) {
      style.remove();
    }
  }

  componentDidMount () {
    const page = getPage();
    const rendered = (
      page && page.content && page.content.raw &&
      page.content.raw.replace(/(<!--.*?-->)/g, '')
    ) || '';

    this.setState({
      rendered,
    });

    domReady(() => {
      // Load the frontend scripts
      const code = document.getElementById('frontend-scripts');
      if (code && code.innerText) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `data:text/javascript;base64,${code.innerText}`;
        document.body.appendChild(script);
      }

      // Load html blocks scripts
      const html = rendered.trim();
      const container = document.createElement('div');
      container.innerHTML = html;

      const scripts = container.getElementsByTagName('script');
      // eslint-disable-next-line no-restricted-syntax
      for(const s of scripts) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;

        if (s.innerText) {
          // inner script
          const frontendScript = Buffer.from(s.innerText).toString('base64');
          script.src = `data:text/javascript;base64,${frontendScript}`;
        }
        else {
          // or from external src
          script.src = s.src;
        }

        document.body.appendChild(script);
      }
    });
  }

  render () {
    const { rendered } = this.state;
    return rendered ?
      // eslint-disable-next-line react/no-danger
      <div dangerouslySetInnerHTML={ { __html: rendered } } /> :
      <center><em>Add your custom block in the editor</em></center>;
  }
}

export default Preview;
