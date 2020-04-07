import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import store from "./store/configureStore";
import theme from "./theme";
import MetaValues from './components/MetaValues'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <MetaValues />
        <AppRouter />
      </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
