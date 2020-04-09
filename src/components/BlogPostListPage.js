import React from "react";

import Header from "./Header";
import PostsList from "./PostsList";


const BlogPostListPage = (props) => {
  return (
    <div>
      <Header />
      <PostsList {...props}/>
    </div>
  );
};

export default BlogPostListPage
