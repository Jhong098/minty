import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Landing from './containers/Landing'
import Dashboard from './containers/Dashboard'
import Budgets from './containers/Budgets'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/dash" component={Dashboard} />
    <Route exact path="/budget" component={Budgets} />
  </Switch>
);

export default Routes;
