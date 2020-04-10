import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

export default function SimpleMenu(props) {

    const useStyles = makeStyles((theme) => ({
      link: {
        margin: theme.spacing(1, 1.5),
      },
    }));    
        
        
    const classes = useStyles();

    return (
        <div>
          {props.category.subreddit_list.map(subreddit => (
            <Link variant="button" color="inherit" component={RouterLink} to={"/"+subreddit.name} className={classes.link} key={subreddit.id}>
                {subreddit.fake_name} 
            </Link>
            )
          )}
        </div>
    );
}