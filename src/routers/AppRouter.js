import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import BlogDashboardPage from "../components/BlogDashboardPage";
import PostItem from "../components/PostItem";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={BlogDashboardPage} />
      <Route path="/posts/:id" exact component={PostItem} />
    </Switch>
  </Router>
);

export default AppRouter;
