import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      invalMiLen: true,
      // bandName: '',
      // isLoading: false,
      // ready: false,
    };
  }

  render() {
    const { invalMiLen } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            onChange={ ({ target }) => {
              const minLen = 2;
              if (target.value.length >= minLen) {
                this.setState({
                  invalMiLen: false,
                  // bandName: target.value,
                });
              } else {
                this.setState({
                  invalMiLen: true,
                  // bandName: target.value
                });
              }
            } }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ invalMiLen }
            onClick={ this.callCreateUser }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
