import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import CardMedia from '@material-ui/core/CardMedia';
import Header from "./Header";
import CommentBox from "./CommentBox";
import { startSetPosts } from "../actions/posts";
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'

export class PostItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.post) {
      try {
        await this.props.startSetPosts();
      } catch (e) {
        this.setState({ error: e.message });
      }
    }
  }
  
  renderMainImage(post) {
    if (post.image) {
      return (
        <a href={post.image} target="_blank">
          <CardMedia
          image={post.image}
          style={{height:640}}
          />
        </a>
      );
    }
  }
  
  renderPost() {
    if (this.props.post) {
      return (
        <Container maxWidth="md" id="header">
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={"https://i.pravatar.cc/60?u="+this.props.post.topic_data.author}/>
        }
        title={this.props.post.topic_data.author}
        subheader={moment.unix(this.props.post.topic_data.created_utc).format("MMMM YYYY")}
      />
          <div>
            <h2>{this.props.post.name}</h2>
            <p className="text-muted">
              Posted by {this.props.post.topic_data.author} on{" "}
              {moment.unix(this.props.post.topic_data.created_utc).format("MMMM Do YYYY")}.
            </p>
            {this.renderMainImage(this.props.post.topic_data)}
            <p>{this.props.post.topic_data.body}</p>
          </div>
          <CommentBox
            id={this.props.post.id}
            comments={this.props.post.comments_data}
          />
        </Container>
      );
    }
    return (
      <div className="container post-item">
        <div className="alert alert-danger" role="alert">
          Could not retrieve post...
          <Link to="/" className="alert-link">
            Click here
          </Link>{" "}
          to go back to dashboard.
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Header />
        {this.renderPost()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts.list.find(post => post.id == props.match.params.id) || null
});

export default connect(
  mapStateToProps,
  { startSetPosts }
)(PostItem);
