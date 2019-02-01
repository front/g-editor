import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './globals';
import Editor from './pages/editor';
import Preview from './pages/preview';
import * as serviceWorker from './serviceWorker';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
