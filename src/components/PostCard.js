import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 240,
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function renderThumbnail(post) {
    const classes = useStyles();
    if (post.topic_data.thumbnail) {
      return <CardMedia
          image={post.topic_data.thumbnail}
          className={classes.media}
        />
    }
}
function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const PostCard = props => {
  const classes = useStyles();
  const post = props.post;

  return (
    <Grid item key={post.id} xs={12} sm={6} md={4}>
      <CardActionArea component={RouterLink} to={`/posts/${post.id+"/"+post.slug}`}>
        <Card className={classes.card}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={"https://i.pravatar.cc/60?u="+post.topic_data.author}/>
        }
        title={post.topic_data.author}
        subheader={moment.unix(post.topic_data.created_utc).format("MMMM YYYY")}
      />
            {renderThumbnail(post)}
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.name.substring(0, 120) + '...'}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default PostCard;
