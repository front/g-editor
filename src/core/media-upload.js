import { Component } from 'react';
import './media-library.scss';

const { wp, lodash } = window;
const { get } = lodash;

const { __ } = wp.i18n;
const { Popover } = wp.components;
const { withSelect } = wp.data;
const { addFilter } = wp.hooks;

class MediaContainer extends Component {
  constructor(props) {
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick(img) {
    const { onSelect, closePopover, gallery = false, multiple = false } = this.props;

    const imgObject = {
      alt: img.alt_text,
      caption: img.caption.raw,
      id: img.id,
      link: img.link,
      mime: img.mime_type,
      sizes: img.media_details.sizes,
      media_details: img.media_details,
      subtype: img.mime_type.split('/')[1],
      type: img.mime_type.split('/')[0],
      url: img.source_url,
      data: img.data,
    };

    if (gallery || multiple) {
      onSelect([imgObject]);
    } else {
      onSelect(imgObject);
    }
    closePopover();
  }

  render() {
    const { media, allowedTypes = [] } = this.props;
    const items =
      media && media.filter(item => !allowedTypes.length || allowedTypes.includes(item.media_type));
    return (
      <div className="media-library__popover__content">
        {items &&
          items.map(item => {
            const sourceUrl =
              get(item, 'media_details.sizes.thumbnail.source_url') ||
              (item.media_type === 'image' && item.source_url);
            const buttonStyle = sourceUrl ? { backgroundImage: `url(${sourceUrl})` } : {};

            return (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                key={ item.id }
                className="media-library-thumbnail"
                style={ buttonStyle }
                onClick={ () => this.onImageClick(item) }
                type="button"
              />
            );
          })}
      </div>
    );
  }
}

const MediaLibrary = withSelect(select => ({
  media: select('core').getMediaItems(),
}))(MediaContainer);

class MediaUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
  }

  openPopover() {
    this.setState({ isVisible: true });
  }

  closePopover() {
    this.setState({ isVisible: false });
  }

  render() {
    if (!this.props.mediaLibrary) {
      console.log('Media Library is deactivated');
      return false;
    }

    const { isVisible } = this.state;

    return (
      <>
        {isVisible && (
          <Popover
            className="media-library__popover"
            onClose={ this.closePopover }
            onClick={ event => event.stopPropagation() }
            position="middle left"
            headerTitle={ __('Media Library') }
          >
            <MediaLibrary { ...this.props } closePopover={ this.closePopover } />
          </Popover>
        )}
        {this.props.render({ open: this.openPopover })}
      </>
    );
  }
}

const replaceMediaUpload = () =>
  withSelect(select => ({
    mediaLibrary: select('core/editor').getEditorSettings().mediaLibrary,
  }))(MediaUpload);

addFilter(
  'editor.MediaUpload',
  'core/edit-post/components/media-upload/replace-media-upload',
  replaceMediaUpload,
);
