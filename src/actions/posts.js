import axios from "axios";

export const setPosts = (posts, page) => ({
  type: "SET_POSTS",
  page: page,
  posts:posts
});

export const startSetPosts = (page = 1) => {
  return async dispatch => {
    try {
      const url = `${process.env.REACT_APP_API_URL+"?page="+page}`
      console.log(url)
      const response = await axios.get(url);
      dispatch(setPosts(response.data.results, page));
    } catch (e) {
      throw new Error("Could not retrieve posts...");
    }
  };
};