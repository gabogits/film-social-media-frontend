import React, { useEffect, useContext } from "react";
import Header from "./Header";
import PostItem from "./../posts/Post";
import UserContext from "./../../context/user/UserContext";
import PostContext from "./../../context/post/PostContext";

const Post = (props) => {
  const userContext = useContext(UserContext);
  const { auth, userAuth } = userContext;

  const postContext = useContext(PostContext);
  const { getPost, postSelect, getPosts, posts } = postContext;
  const query = props.location.pathname.split("/");
  const postItem = query[2];

  useEffect(() => {
    userAuth();

    if (posts.length === 0) {
      console.log("no tengo posts man");
      getPosts();
    }
    if (postItem) {
      console.log(postItem);
      getPost(postItem);
    }
  }, [postItem, auth, posts, props.history]);
  console.log(postSelect);
  if (!auth || !postSelect) return null;
  return (
    <div>
      <Header></Header>
      <PostItem post={postSelect}></PostItem>
    </div>
  );
};

export default Post;
