import React, { useContext, useEffect } from "react";
import Header from "./Header";
import PostNew from "./../posts/PostNew";
import PostList from "./../posts/PostList";
import ScoreList from "../score/ScoreList";
import PostContext from "../../context/post/PostContext";
import UserContext from "../../context/user/UserContext";
import UsersList from "./../user/UsersList";

const Feed = (props) => {


  const userContext = useContext(UserContext);
  const { auth, userAuth, user, token, loading } = userContext;


  useEffect(()   => {
     userAuth();
    if (!auth) {
    
      props.history.push("/");
    }
  }, [auth, props.history]);

  // {formPostEdit ? <PostNew /> : <PostList></PostList> }
  if(!auth && !loading) return null;
  return (
    <div>
       <Header></Header>
      <UsersList />
      <PostNew />
      <PostList></PostList>
    </div>
  );
};

export default Feed;
