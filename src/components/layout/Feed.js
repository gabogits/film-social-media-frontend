import React, { useContext, useEffect } from "react";
import Header from "./Header";
import PostNew from "./../posts/PostNew";
import PostList from "./../posts/PostList";
import ScoreList from "../score/ScoreList";
import UsersList from "./../user/UsersList";
import UserContext from "../../context/user/UserContext";
import ReplyContext from "../../context/reply/ReplyContext";
import BottomBar from "./BottomBar";

const Feed = (props) => {
  const userContext = useContext(UserContext);
  const { userAuth, user, users, getUsers, userSelect, auth, setPage } = userContext;
  const replyContext = useContext(ReplyContext);
  const { newReply } = replyContext;
  useEffect(() => {
    userAuth();
    getUsers();

    setPage("feed");
    // eslint-disable-next-line
  }, [newReply, userSelect, auth]);

  if (!user || !users) return null;
  return (
    <main className="top-space">
      <Header props={props}></Header>
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
      <BottomBar props={props} />
    </main>
  );
};

export default Feed;
