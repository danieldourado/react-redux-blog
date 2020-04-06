import React from "react";
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
  const appName = process.env.REACT_APP_NAME
    return (
      <React.Fragment>
        <AppBar position="relative" color="primary">
          <Toolbar>
            <Typography 
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap>
            <Link color="inherit" component={RouterLink} to="/">
                {appName}
            </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}