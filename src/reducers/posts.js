const postsReducer = (state = {"list":[]}, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        list:[
          ...state.list,
          ...action.posts
        ],
        currentPage: action.page,
      };
    default:
      return state;
  }
};

export default postsReducer;
