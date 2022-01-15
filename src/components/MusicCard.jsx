import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { music, prevUrl } = this.props;
    return (
      <div>
        <h3>
          { music }
        </h3>
        <audio data-testid="audio-component" src={ prevUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string,
  prevUrl: PropTypes.string,
};

MusicCard.defaultProps = {
  music: '',
  prevUrl: '',
};
