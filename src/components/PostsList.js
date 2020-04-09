import React from 'react';
import { connect } from 'react-redux';
import { startSetPosts } from '../actions/posts';
import PostCard from './PostCard'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress';
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
    console.log('component mount')
      if (!(this.props.posts && this.props.posts[this.props.match.params.category])) {
        await this.props.startSetPosts(this.props.match.params.category);
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
      if (!(this.props.posts && this.props.posts[this.props.match.params.category])) {
        this.props.startSetPosts(this.props.match.params.category);
      }
      return (
        <div className="loader-container">
          <p className="text-monospace loading-text text-center">
            Fetching posts...
          </p>
          <p className="text-monospace loading-text text-center">
            Please wait...
          </p>
        </div>
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
          {this.props.posts && this.props.posts[this.props.match.params.category] ? this.props.posts[this.props.match.params.category].map(post => (
              <PostCard post={post} key={post.id} />
            )
          ): this.handleFetchStatus()}
        </Grid>
      </Container>
      )
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  startSetPosts: (category, page) => dispatch(startSetPosts(category, page))
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
