import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Inventory from '../inventory';
import Login from '../login';
import Logout from '../logout';
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/auth" exact component={Login} />
      <Route path="/" exact component={Inventory} />
      <Route path="/logout" exact component={Logout} />
    </Switch>
  </Router>
);

export default Routes;
