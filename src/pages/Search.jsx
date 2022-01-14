import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      invalMiLen: true,
      bandName: '',
      isLoading: false,
      ready: false,
      bandsCalled: [],
    };
  }

  async callSearchAlbumsAPI() {
    const { bandName } = this.state;
    this.setState({
      bandsCalled: await searchAlbumsAPI(bandName),
      ready: true });
  }

  render() {
    const { invalMiLen, isLoading, ready, bandsCalled } = this.state;
    const checkItsLoadingOver = (isLoading ? (
      <Loading />)
      : (
        <ol>
          {bandsCalled.map((bn) => (
            <li
              key={ bn.artistId }
            >
              { bn.artistName }
            </li>))}
        </ol>
      ));
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          {!ready ? (
            <label htmlFor="request">
              <input
                data-testid="search-artist-input"
                onChange={ ({ target }) => {
                  const minLen = 2;
                  if (target.value.length >= minLen) {
                    this.setState({
                      invalMiLen: false,
                      bandName: target.value,
                    });
                  } else {
                    this.setState({
                      invalMiLen: true,
                      bandName: target.value,
                    });
                  }
                } }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ invalMiLen }
                onClick={ this.callSearchAlbumsAPI }
              >
                Pesquisar
              </button>
            </label>
          ) : checkItsLoadingOver}
        </form>
      </div>
    );
  }
}

export default Search;
