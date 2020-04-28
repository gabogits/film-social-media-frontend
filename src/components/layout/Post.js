import React, {useEffect, useContext} from "react";
import Header from "./Header";
import PostItem from "./../posts/Post";
import UserContext from "./../../context/user/UserContext";

const Post = (props) => {
  
  const userContext = useContext(UserContext);
  const { auth } = userContext;

  useEffect(() => {
    console.log(auth);
    if (!auth) {
      props.history.push("/login");
    }
  }, [auth, props.history]);
  if (!auth) return null;
  return (
    <div>
      <Header></Header>
      <PostItem></PostItem>
    </div>
  );
};

export default Post;
