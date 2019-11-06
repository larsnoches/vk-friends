import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from '../layout';
import Entrance from '../entrance';
import Progress from '../progress';
import Friends from '../friends';

const AppContainer = () => (
  <Layout>
    <Router>
      <Switch>
        <Route path="/friends" component={Friends} />
        <Route path="/progress" component={Progress} />
        <Route path="/" component={Entrance} />
      </Switch>
    </Router>
  </Layout>
);

export default AppContainer;
