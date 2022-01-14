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
      load: false,
      ready: false,
      bandsCalled: [],
    };
  }

   callSearchAlbumsAPI = async (e) => {
     e.preventDefault();
     const { bandName } = this.state;
     const result = await searchAlbumsAPI(bandName);
     this.setState({
       bandsCalled: result,
       ready: true,
       bandName: '' });
   }

   render() {
     const { invalMiLen, load, ready, bandsCalled } = this.state;
     const searcher = (
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
       </label>);

     const checkItsLoadingOver = (load ? (
       <Loading />)
       : (
         <ol>
           { searcher }
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
             searcher
           ) : checkItsLoadingOver}
         </form>
       </div>
     );
   }
}

export default Search;
