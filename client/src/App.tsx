import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { validToken, initialAuth, logOut } from './store/authSlice';
import { RootState } from './store/rootReducer';
import Layout from './views/Layout';
import Home from './views/Home';
import Requests from './views/Requests';
import NewRequest from './views/Requests/NewRequest';
import Messages from './views/Messages';
import Profile from './views/Profile';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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
          <Route exact path="/" component={Home} />
          {isLoggedIn && (
            <>
              <Route exact path="/requests" component={Requests} />
              <Route path="/requests/new" component={NewRequest} />
              <Route path="/messages" component={Messages} />
              <Route path="/profile" component={Profile} />
            </>
          )}
          {/* <Redirect to="/" /> */}
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
