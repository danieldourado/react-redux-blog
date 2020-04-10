const postsReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_POSTS":
      let newObj = {}
      newObj[action.subreddit] = state 
        && state[action.subreddit] ? [...state[action.subreddit], ...action.posts] : action.posts
      return updateObject(state, newObj)
    default:
      return state;
  }
};

const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

export default postsReducer;
