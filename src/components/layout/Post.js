import React, { useEffect, useContext, Fragment } from "react";
import Header from "./Header";
import PostItem from "./../posts/Post";
import PostNew from "./../posts/PostNew";
import UserContext from "./../../context/user/UserContext";
import PostContext from "./../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";
import BottomBar from "./BottomBar";

const Post = (props) => {
  const userContext = useContext(UserContext);
  const { auth, userAuth, user, getUsers } = userContext;

  const postContext = useContext(PostContext);
  const {
    getPost,
    postSelect,
    formPostEdit,
    errormsg,
    resetSelectPost,
  } = postContext;
  const query = props.location.pathname.split("/");
  const postItem = query[2];

  const replyContext = useContext(ReplyContext);
  const { reply, replies } = replyContext;

  useEffect(() => {
    userAuth();
    getUsers();
    if (user) {
      if (postItem === "edit" && query[3] !== "") {
        getPost(query[3], true, user);
      } else {
        if (postItem !== "" && postItem !== "edit")
          getPost(postItem, false, user);
      }
    }

    return () => {
      resetSelectPost();
    };
  }, [auth, props.location.pathname, reply, replies]);

  const back = () => {
    props.history.go(-1);
  };

  return (
    <main className="top-space ">
      <div onClick={back} className="btn-back"></div>
      <Header props={props}></Header>
      <div className="container">
        <div className="content-center">
          {postSelect ? (
            <Fragment>
              {!formPostEdit ? (
                <PostItem post={postSelect} />
              ) : (
                <PostNew props={props} />
              )}
            </Fragment>
          ) : (
            <div className="post-new box-format center">
              {!errormsg ? (
                <p>La publicación se ha eliminado </p>
              ) : (
                <p>{errormsg} </p>
              )}
            </div>
          )}
        </div>
      </div>
      <BottomBar props={props} />
    </main>
  );
};

export default Post;
