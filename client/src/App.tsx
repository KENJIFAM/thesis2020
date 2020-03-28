import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';
import { validToken, initialAuth, logOut } from './store/authSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (validToken()) {
      dispatch(initialAuth());
    } else {
      dispatch(logOut());
    }
  }, [dispatch]);

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
