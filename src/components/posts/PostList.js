import React, { useEffect, useContext } from "react";
import Post from "./Post";
import PostContext from "../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";
import UserContext from "./../../context/user/UserContext";

const PostList = (creator) => {
  const userContext = useContext(UserContext);
  const { userSelect, user, userAuth } = userContext;
  const postContext = useContext(PostContext);
  const { posts, getPosts } = postContext;
  const replyContext = useContext(ReplyContext);
  const { newReply } = replyContext;

  useEffect(() => {
    if (user) {
      getPosts(creator, user);
    }
    // eslint-disable-next-line
  }, [newReply, userSelect]);
  if (posts.length === 0) return null;

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
