import React from "react";
import Header from "./Header";
import PostNew from "./../posts/PostNew";

import PostList from "./../posts/PostList";

import ScoreList from "../score/ScoreList";
/*

<Header></Header>
      <ScoreList></ScoreList>
   
      */
const Feed = () => {
  return (
    <div>
       <PostNew></PostNew>
       <PostList></PostList>
      
    </div>
  );
};

export default Feed;
