import React from "react";
import Header from "./Header";
import PostNew from "./../posts/PostNew";

import PostList from "./../posts/PostList";

import ScoreList from "../score/ScoreList";

const Feed = () => {
  return (
    <div>
      <Header></Header>
      <ScoreList></ScoreList>
      <PostNew></PostNew>
      <PostList></PostList>

      <h2>Este va ser el Feed</h2>
    </div>
  );
};

export default Feed;
