import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { validToken, initialAuth, logOut } from './store/authSlice';
import Layout from './views/Layout';
import Home from './views/Home';
import Requests from './views/Requests';
import NewRequest from './views/Requests/NewRequest';
import Messages from './views/Messages';

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
          <Route exact path="/requests" component={Requests} />
          <Route path="/requests/new" component={NewRequest} />
          <Route path="/messages" component={Messages} />
          <Route path="/about" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
