import React from "react";
import { connect } from "react-redux";
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
import {Helmet} from "react-helmet";
import agent from '../agent'

export class PostItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.state.post) {
      const res = await agent.Posts.getSingle(this.props.match.params.category, this.props.match.params.id)
      this.setState( (state, props) => ({post: res[0]}))
    }
  }
  
  renderMainImage(post) {
    if (post.image) {
      return (
        <a href={post.image} target="_blank" rel="noopener noreferrer">
          <CardMedia
          image={post.image}
          style={{height:640}}
          />
        </a>
      );
    }
  }
  
  renderPost() {
    if (this.state.post) {
      const { name, topic_data, id, comments_data } = this.state.post
      return (
        <Container maxWidth="md" id="header" style={{padding:"0px", paddingTop:"16px"}}>
          <Helmet>
            <title>{name+" - "+process.env.REACT_APP_NAME}</title>
            <meta name="description" content="Nested component" />
          </Helmet>
          <Paper elevation={3} style={{margin:"16px"}}>
            <CardHeader
              avatar={<Avatar aria-label="recipe" src={"https://i.pravatar.cc/60?u="+topic_data.author}/>}
              title={topic_data.author}
              subheader={moment.unix(topic_data.created_utc).format("MMMM YYYY")}
            />
            <Typography style={{margin:"16px", marginTop:"0px"}} component="h2" variant="h5">{name}</Typography>
            
            {this.renderMainImage(topic_data)}
            
            <Typography variant="body2" color="textSecondary" component="p">
              {topic_data.body}
            </Typography>
            
            <CommentBox
              id={id}
              comments={comments_data}
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

const mapStateToProps = (state, props) => {
  return {
    post: state.posts 
    && state.posts[props.match.params.category] 
    && state.posts[props.match.params.category].find(post => post.id == props.match.params.id) || null
  }
};

export default connect(
  mapStateToProps,
  { startSetPosts }
)(PostItem);
