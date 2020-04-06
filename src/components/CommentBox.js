import React from "react";
import moment from "moment";

import { sortCommentsByDate } from "../selectors/posts";

class CommentBox extends React.Component {

  renderComments = () => {
    if (this.props.comments.length > 0) {
      return sortCommentsByDate(this.props.comments).map(comment => {
        return (
          <li className="list-group-item pl-0" key={comment.id}>
            <p className="text-muted mb-1">
              Posted by {comment.author} on{" "}
              {moment.unix(comment.created_utc).format("MM-DD-YY [at] HH:mm")}
            </p>
            <p className="mb-1">{comment.body}</p>
          </li>
        );
      });
    } else {
      return <p>Be the first to comment...</p>;
    }
  };
  render() {
    return (
      <div class="d-inline-block">
        <h4>Comments</h4>
        <ul className="list-group-flush pl-0">{this.renderComments()}</ul>
      </div>
    );
  }
}

export default CommentBox