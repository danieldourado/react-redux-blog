import React from "react";
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import CategoryList from './CategoryList'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    });
    
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }
  
  render() {
  const { classes } = this.props;
  const appName = process.env.REACT_APP_NAME
    return (
      <React.Fragment>
        <AppBar position="relative" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography 
              component="h2"
              variant="h5"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}>
              <Link color="inherit" component={RouterLink} to="/">
                  {appName}
              </Link>
            </Typography>
            <CategoryList/>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
