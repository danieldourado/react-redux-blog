import axios from "axios";

export const setPosts = (posts, subreddit, page) => ({
  type: "SET_POSTS",
  posts:posts,
  subreddit:subreddit,
  page: page,
});

export const startSetPosts = (subreddit, page = 1) => {
  return async dispatch => {
      const url = `${process.env.REACT_APP_API_URL+"subreddit/"+subreddit+"?page="+page}`
      console.log(subreddit, page, url)
      const response = await axios.get(url);
      dispatch(setPosts(response.data.results, subreddit, page));
  };
};