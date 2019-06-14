import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopBar from './layout/TopBar';
import Footer from './layout/Footer';
import Board from './Board';
import Post from './Post';

export default () => (
  <div className="app">
    <TopBar />
    <Router>
      <Switch>
        <Route exact path="/" component={Board} />
        <Route path="/post" component={Post} />
      </Switch>
    </Router>
    <Footer />
  </div>
);
