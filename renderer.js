// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import App from './app/App';
import Settings from './app/components/settings/Settings';



render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/settings" component={Settings}/>
  </Router>),
  document.getElementById('root'));
