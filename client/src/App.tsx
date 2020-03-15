import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/partners" component={Home} />
          <Route path="/requests" component={Home} />
          <Route path="/about" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
