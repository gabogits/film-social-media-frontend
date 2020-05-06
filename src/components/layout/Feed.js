import React, { useContext, useEffect } from "react";
import Header from "./Header";
import PostNew from "./../posts/PostNew";
import PostList from "./../posts/PostList";
import ScoreList from "../score/ScoreList";
import UsersList from "./../user/UsersList";
import UserContext from "../../context/user/UserContext";
import PostContext from "../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";

const Feed = () => {
  const userContext = useContext(UserContext);
  const { userAuth, user, users, getUsers, userSelect, auth } = userContext;
  const postContext = useContext(PostContext);
  const { resetSelectPost } = postContext;
  const replyContext = useContext(ReplyContext);
  const { newReply } = replyContext;
  useEffect(() => {
    userAuth();
    getUsers();
    resetSelectPost();
    // eslint-disable-next-line
  }, [newReply, userSelect, auth]);

  if (!user || !users) return null;
  return (
    <div>
      <Header></Header>
      <ScoreList users={users} />
      <UsersList users={users} />
      <PostNew />
      <PostList></PostList>
    </div>
  );
};

export default Feed;
