import React from 'react';
import { connect } from 'react-redux';
import { startSetPosts } from '../actions/posts';
import PostCard from './PostCard'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

export class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
    
    this.trackScrolling = this.trackScrolling.bind(this)
  }
  async componentDidMount() {
    try {
      if (!this.props.posts.list) {
        await this.props.startSetPosts();
      }
    } catch (e) {
      this.setState({ error: e.message });
    }
  }
  
  componentWillUpdate(){
    document.addEventListener('scroll', this.trackScrolling);
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  
  async trackScrolling(){
    const wrappedElement = document.getElementById('header');
    const ammount = wrappedElement.getBoundingClientRect().bottom*0.5
    if (ammount <= window.innerHeight) 
    {
      document.removeEventListener('scroll', this.trackScrolling);
      await this.props.startSetPosts(this.props.currentPage+1);
    }
  };
  
  
  handleFetchStatus = () => {
    if (this.state.error) {
      return (
        <p className="text-monospace alert-danger text-center">
          {this.state.error}
        </p>
      );
    } else {
      return (
        <LinearProgress/>
      );
    }
  };
  renderThumbnail(post) {
    if (post.topic_data.thumbnail) {
      return <img src={post.topic_data.thumbnail} alt="" className="img-fluid" />;
    }
  }
  render() {
    return (
      <Container style={{paddingTop:"32px"}} maxWidth="md" id="header">
        <Grid container spacing={4}>
          {this.props.posts.length >= 2 ? this.props.posts.map(post => (
              <PostCard post={post} key={post.id} />
            )
          ): this.handleFetchStatus()}
        </Grid>
      </Container>
      )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.list,
  currentPage: state.posts.currentPage
});

const mapDispatchToProps = dispatch => ({
  startSetPosts: (page) => dispatch(startSetPosts(page))
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
