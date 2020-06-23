import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './core';

import Editor from './pages/editor';
import Preview from './pages/preview';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/preview" component={ Preview } />
      <Route exact path="/posts" component={ Editor } />
      <Route exact path="/pages" component={ Editor } />
      <Route component={ Editor } />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
