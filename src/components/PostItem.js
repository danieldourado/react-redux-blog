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
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
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
        <Container maxWidth="md" id="header" style={{padding:"0px", paddingTop:"16px"}}>
          <Paper elevation={3} style={{margin:"16px"}}>
            <CardHeader
              avatar={<Avatar aria-label="recipe" src={"https://i.pravatar.cc/60?u="+this.props.post.topic_data.author}/>}
              title={this.props.post.topic_data.author}
              subheader={moment.unix(this.props.post.topic_data.created_utc).format("MMMM YYYY")}
            />
            <Typography style={{margin:"16px", marginTop:"0px"}} component="h2" variant="h5">{this.props.post.name}</Typography>
            
            {this.renderMainImage(this.props.post.topic_data)}
            
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.post.topic_data.body}
            </Typography>
            
            <CommentBox
              id={this.props.post.id}
              comments={this.props.post.comments_data}
            />
            </Paper>
        </Container>
        
      );
    }
    return (
      <LinearProgress/>
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
