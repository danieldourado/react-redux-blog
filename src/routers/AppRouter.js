import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import BlogDashboardPage from "../components/BlogDashboardPage";
import BlogPostListPage from "../components/BlogPostListPage";
import CategoryList from "../components/CategoryList";
import PostItem from "../components/PostItem";
import PostsList from "../components/PostsList";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={BlogDashboardPage} />
      <Route path="/:category" exact component={BlogPostListPage} />
      
      <Route path="/posts/:id/:slug" exact component={PostItem} />
    </Switch>
  </Router>
);

export default AppRouter;
