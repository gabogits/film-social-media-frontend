import React, { useContext, useEffect } from "react";
import Header from "./Header";
import PostNew from "./../posts/PostNew";
import PostList from "./../posts/PostList";
import ScoreList from "../score/ScoreList";
import PostContext from "../../context/post/PostContext";
import UserContext from "../../context/user/UserContext";

/*


      <ScoreList></ScoreList>
   
      */

const Feed = (props) => {


  const userContext = useContext(UserContext);
  const { auth } = userContext;
  useEffect(() => {
    console.log(auth);
    if (!auth) {
      props.history.push("/login");
    }
  }, [auth, props.history]);

  // {formPostEdit ? <PostNew /> : <PostList></PostList> }
  return (
    <div>
      <Header></Header>
      <PostNew />
      <PostList></PostList>
    </div>
  );
};

export default Feed;
