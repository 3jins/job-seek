import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopBar from './layout/TopBar';
import Footer from './layout/Footer';
import BoardList from './BoardList';
import Post from './Post';

export default () => (
  <div className="app">
    <TopBar />
    <Router>
      <Switch>
        <Route exact path="/" component={BoardList} />
        <Route path="/post" component={Post} />
      </Switch>
    </Router>
    <Footer />
  </div>
);
