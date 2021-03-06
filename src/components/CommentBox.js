import React from "react";
import moment from "moment";
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { sortCommentsByDate } from "../selectors/posts";

const renderComments = (props) => {
  if (props.comments.length > 0) {
    return sortCommentsByDate(props.comments).map(comment => {
      return (
        <Container key={comment.id} style={{overflow: "hidden", textOverflow: "ellipsis"}}>
          <CardHeader style={{paddingBottom:"0px"}} 
            avatar={<Avatar aria-label="recipe" src={"https://i.pravatar.cc/60?u="+comment.author}/>}
            title={comment.author+" "+moment.unix(comment.created_utc).format("MMMM YYYY")}
          />
          <Typography style={{paddingLeft:"16px", paddingRight:"16px"}} variant="body2" color="textSecondary" component="p">
              {comment.body}
            </Typography>
        </Container>
      );
    });
  } else {
    return <p>Be the first to comment...</p>;
  }
};
const CommentBox = props => {
  return (
    <div>
      <Typography style={{marginTop:"16px", marginLeft:"16px"}} component="h2" variant="h5">{props.comments.length+" Comments"}</Typography>
      {renderComments(props)}
    </div>
  );
}

export default CommentBox