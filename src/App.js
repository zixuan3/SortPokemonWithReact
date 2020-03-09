import React from 'react';
import './App.scss';
import Gallery from './Gallery.js';
import SearchList from './SearchList.js';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';
function RouterStructure() {
  return (
    <Router>
      <div>
        <div className="CatalogWrapper">
          <div className="Catalog">
            <Link to="/">Home</Link>
          </div>
          <div className="Catalog">
            <Link to="/searchlist">SearchList</Link>
          </div>
          <div className="Catalog">
            <Link to="/gallery">Gallery</Link>
          </div>
        </div>

        <hr />
	  	<Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/gallery">
            <GalleryTitle/>
	  		<Gallery/>
          </Route>
          <Route path="/searchlist">
            <SearchListTitle/>
	  		<SearchList/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function App() {
  return (
    <div className="App">
	  <div>
	  	{ RouterStructure()}
	  </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2 className="text1">A Pokemon website made by CZX.</h2>
      <h2 className="text1">API source: https://pokeapi.co/docs/v2.html/</h2>
    </div>
  );
}

function GalleryTitle() {
	/*<div>
      	<h2>Gallery</h2>
    </div>*/
	return (
  		null 
  	);
}

function SearchListTitle() {
  	/*<div>
      	<h2>SearchList</h2>
    </div>*/
	return (
    	null
  	);
}

export default App;

//https://pokeapi.co/api/v2/pokemon?offset=0&limit=964
//https://pokeapi.co/api/v2/type
//https://pokeapi.co/api/v2/type/1/
//flying poison ground rock bug ghost steel fire water grass electric psychic ice dragon dark fairy