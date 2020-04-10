import agent from "../agent";

export const setPosts = (posts, subreddit, page) => ({
  type: "SET_POSTS",
  posts:posts,
  subreddit:subreddit,
  page: page,
});

export const startSetPosts = (subreddit, page = 1) => {
  return async dispatch => {
      const response = await agent.Posts.get(subreddit, page);
      dispatch(setPosts(response, subreddit, page));
  };
};