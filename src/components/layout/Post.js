import React, { useEffect, useContext } from "react";
import Header from "./Header";
import PostItem from "./../posts/Post";
import PostNew from "./../posts/PostNew";
import UserContext from "./../../context/user/UserContext";
import PostContext from "./../../context/post/PostContext";

const Post = (props) => {
  const userContext = useContext(UserContext);
  const { auth, userAuth, user } = userContext;

  const postContext = useContext(PostContext);
  const { getPost, postSelect, getPosts, posts, formPostEdit } = postContext;
  const query = props.location.pathname.split("/");
  const postItem = query[2];

  useEffect(() => {
    userAuth();
    if (posts.length === 0) {
   
        if(user) {
            getPosts(null, user);
        }
    }
    
    if (postItem === "edit" ) {
      getPost(query[3], true);
    }else {
      getPost(postItem);
      
    }
    
  }, [postItem, posts, auth, postSelect]);

  if (!posts || !postSelect || !user) return null;
  return (
    <div>
      <Header></Header>
      {!formPostEdit ? <PostItem  post={postSelect}  /> : <PostNew props= {props}  />}
    </div>
  );
};

export default Post;
