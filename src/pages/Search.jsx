import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      resultName: '',
    };
  }

   callSearchAlbumsAPI = async (e) => {
     e.preventDefault();
     this.setState({ bandsCalled: '' });
     const { bandName } = this.state;
     const result = await searchAlbumsAPI(bandName);
     this.setState({
       bandsCalled: result,
       ready: true,
       resultName: bandName,
       bandName: '' });
   }

   render() {
     const { invalMiLen, load, ready, bandsCalled, resultName } = this.state;
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

     const checkItsLoadingOver = (
       <div>
         <header>
           { searcher }
         </header>
         <h2>
           { `Resultado  de álbuns de:  ${resultName} `}
         </h2>

         { load ? (
           <Loading />
         )
           : (
             <ol>
               {bandsCalled.length ? bandsCalled.map((bn) => (
                 <li
                   key={ bn.artistId }
                 >
                   <header>
                     {`${bn.artistName} || ${bn.collectionName}`}
                     <img src={ bn.artworkUrl100 } alt={ bn.artistName } />
                     <Link
                       to={ `/album/${bn.collectionId}` }
                       data-testid={ `link-to-album-${bn.collectionId}` }
                     >
                       More
                     </Link>
                   </header>
                 </li>))
                 : <li> Nenhum álbum foi encontrado</li>}
             </ol>
           )}
       </div>);
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
