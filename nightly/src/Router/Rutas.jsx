import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../View/Home';
import About from '../View/About';

export default class rutas extends Component {
  render() {
    return (
      <Switch>
        <Route path="/porueva">
          <About />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
}
