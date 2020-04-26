import React, {useContext} from "react";
import Header from "./Header";
import PostNew from "./../posts/PostNew";
import PostList from "./../posts/PostList";
import ScoreList from "../score/ScoreList";
import PostContext from "../../context/post/PostContext";

/*

<Header></Header>
      <ScoreList></ScoreList>
   
      */

const Feed = () => {
  
 const postContext = useContext(PostContext);
 const  {formPostEdit}  = postContext;

  return (
    <div>
      {formPostEdit ? <PostNew /> : <PostList></PostList> } 
      
    </div>
  );
};

export default Feed;
