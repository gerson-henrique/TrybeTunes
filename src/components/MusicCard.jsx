import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loadingII: false,
      check: false,
      fav: [],
    };
  }

  componentDidMount() {
    this.callGetFav();
  }

  callGetFav = async () => {
    this.setState({ fav: await getFavoriteSongs() }, this.startChecked);
  }

  startChecked= () => {
    const { track } = this.props;
    const { fav } = this.state;
    const ch = fav.some((song) => (song.trackId === track));
    this.setState({ check: ch });
  }

  callAddSong = async () => {
    const { fullMusicObj } = this.props;
    this.setState({ loadingII: true });
    await addSong(fullMusicObj);
    this.setState((prev) => ({ loadingII: false,
      check: !prev.check }));
  }

  render() {
    const { loadingII, check } = this.state;
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
            checked={ check }
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
