import React from 'react';
import './App.css';
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Layout from './components/Layout';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import { StoreProvider } from './store';

const history = createBrowserHistory();

function App(): JSX.Element {
  return (
    <Router history={history}>
    <StoreProvider>
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
    </StoreProvider>
    </Router>
  );
}

export default App;
