import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cms from './Cms';
import Login from './Login';

const App = () => (
  <div className="app-routes">
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Cms} />
    </Switch>
  </BrowserRouter>
  </div>
);

export default App;
