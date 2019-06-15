import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopBar from './layout/TopBar';
import Menu from './Menu';
import Footer from './layout/Footer';
import BoardList from './BoardList';
import Post from './Post';

export default () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="app">
      <TopBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Menu isMenuOpen={isMenuOpen} />
      <Router>
        <Switch>
          <Route exact path="/" component={BoardList} />
          <Route path="/post" component={Post} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};
