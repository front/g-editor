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
    if (page) {
      this.setState({
        rendered: page.content ? page.content.rendered : '',
      });
    }

    // Load the frontend scripts
    domReady(() => {
      const code = document.getElementById('frontend-scripts');
      if(code && code.innerText) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = `data:text/javascript;base64,${code.innerText}`;
        document.body.appendChild(script);
      }
    });
  }

  render () {
    const { rendered } = this.state;
    return rendered ?
      <div dangerouslySetInnerHTML={{ __html: rendered }} /> :
      <center><em>Add your custom block in the editor</em></center>;
  }
}

export default Preview;
