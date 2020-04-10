import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import postsReducer from "../reducers/posts";
import categoriesReducer from "../reducers/categories";

const reducers = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
