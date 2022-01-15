import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumMList: [],
      ready: false,
      info: {},
      musics: [],
    };
  }

  componentDidMount() {
    this.callGetMusics();
  }

  callGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      albumMList: await getMusics(id),
      ready: true });
    this.setState((prev) => ({
      info: prev.albumMList[0],
      musics: prev.albumMList.slice(1),
    }));
  }

  render() {
    const { info, ready, musics } = this.state;
    // const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        {ready
          ? (
            <div>
              <h1 data-testid="artist-name">
                { info.artistName }
              </h1>

              <h2 data-testid="album-name">
                { info.collectionName }
              </h2>
              {musics.map((song) => (<MusicCard
                key={ song.trackId }
                music={ song.trackName }
                prevUrl={ song.previewUrl }
              />))}
            </div>
          )
          : (
            <Loading />
          )}
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {
    params: {
      id: '' } },
};

export default Album;
