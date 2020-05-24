import React, { useEffect, useState, useContext, Fragment } from "react";
import Header from "./Header";
import PostItem from "./../posts/Post";
import PostNew from "./../posts/PostNew";
import UserContext from "./../../context/user/UserContext";
import PostContext from "./../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";
import BottomBar from "./BottomBar";
import Loader from "../templates/Loader";
import ModalDelete from "../templates/ModalDelete";

const Post = (props) => {
  const userContext = useContext(UserContext);
  const { auth, userAuth, user, getUsers, page } = userContext;

  const postContext = useContext(PostContext);
  const {
    getPost,
    postSelect,
    formPostEdit,
    errormsg,
    resetSelectPost,
    modalDelete
  } = postContext;
  const query = props.location.pathname.split("/");
  const postItem = query[2];

  const replyContext = useContext(ReplyContext);
  const { reply, replies } = replyContext;
  const [showMsg, saveShowMsg] = useState(false);

  useEffect(() => {
    userAuth();
    getUsers();
    if (user) {
      if (postItem === "edit" && query[3] !== "") {
        getPost(query[3], true, user, page);
      } else {
        if (postItem !== "" && postItem !== "edit")
          getPost(postItem, false, user, page);
      }
    }
    setTimeout(() => {
      saveShowMsg(true);
    }, 1000);

    return () => resetSelectPost();

    // eslint-disable-next-line
  }, [auth, props.location.pathname, reply, replies]);

  const back = () => {
    
    props.history.go(-1);
  };

  return (
    <main className={`top-space post-view ${modalDelete ? "shadow": null}`}>
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
            <Fragment>
              {!showMsg ? <Loader></Loader> : null}
              <div
                className={`post-new box-format center msg-deleted-nofound ${
                  showMsg ? "active" : ""
                }`}
              >
                {!errormsg ? (
                  <p>La publicación se ha eliminado </p>
                ) : (
                  <p>{errormsg} </p>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <ModalDelete />
      <BottomBar props={props} />
    </main>
  );
};

export default Post;
