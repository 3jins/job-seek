import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchContext from '../SearchContext';
import TopBar from './layout/TopBar';
import Menu from './menu/Menu';
import Footer from './layout/Footer';
import BoardList from './BoardList';
import Post from './Post';
import './App.scss';

export default () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchState, setSearchState] = useState({
    companies: [],
    jobGroups: [],
    categories: [],
  });

  return (
    <div className="app">
      <TopBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <SearchContext.Provider value={{ searchContext: searchState, setSearchContext: setSearchState }}>
        <Menu isMenuOpen={isMenuOpen} />
        <div id="content">
          <Router>
            <Switch>
              <Route exact path="/" component={BoardList} />
              <Route path="/post" component={Post} />
            </Switch>
          </Router>
        </div>
      </SearchContext.Provider>
      <Footer />
    </div>
  );
};
