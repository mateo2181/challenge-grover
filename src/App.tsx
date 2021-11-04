import React from 'react';
import './App.css';
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Layout from './components/Layout';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import store from './store';
import { Provider } from 'react-redux'

const history = createBrowserHistory();

function App(): JSX.Element {
  return (
    <Router history={history}>
    <Provider store={store}>
      <Layout>
        <Switch>
            <Route exact path="/">
              <Posts />
            </Route>
            <Route exact path="/detail">
              <PostDetail />
            </Route>
          </Switch>
      </Layout>
    </Provider>
    </Router>
  );
}

export default App;
