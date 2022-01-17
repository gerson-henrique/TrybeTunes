import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loadingII: false,
    };
  }

  callAddSong = async () => {
    const { fullMusicObj } = this.props;
    this.setState({ loadingII: true });
    await addSong({ fullMusicObj });
    this.setState({ loadingII: false });
  }

  render() {
    const { loadingII } = this.state;
    const { music, prevUrl, track } = this.props;
    return (
      <div>

        {loadingII
          && <Loading />}

        <h3>
          { music }
        </h3>
        <audio data-testid="audio-component" src={ prevUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="musicCard">
          Favorita
          <input
            data-testid={ `checkbox-music-${track}` }
            type="checkbox"
            onChange={ this.callAddSong }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string,
  prevUrl: PropTypes.string,
  track: PropTypes.number,
  fullMusicObj: PropTypes.string,
};

MusicCard.defaultProps = {
  music: '',
  prevUrl: '',
  track: '',
  fullMusicObj: [],
};
