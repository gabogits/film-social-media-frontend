import React, { useContext, useEffect } from "react";
import Header from "./Header";
import PostNew from "./../posts/PostNew";
import PostList from "./../posts/PostList";
import ScoreList from "../score/ScoreList";
import UsersList from "./../user/UsersList";
import UserContext from "../../context/user/UserContext";
import PostContext from "../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";
import BottomBar from "./BottomBar"

const Feed = () => {
  const userContext = useContext(UserContext);
  const { userAuth, user, users, getUsers, userSelect, auth, resetProfile } = userContext;
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
    <main className="top-space">
      <Header></Header>
      <div className="container">
        <div className={`sidebar-1`}>
          <div className="sidebar-content">
            <ScoreList users={users} />
          </div>
        </div>
        <div className="content-center">
          <PostNew />
          <PostList></PostList>
        </div>
        <div className={`sidebar-2`}>
          <div className="sidebar-content">
            <UsersList users={users} />
          </div>
        </div>
      </div>
      <BottomBar />
    </main>
  );
};

export default Feed;
