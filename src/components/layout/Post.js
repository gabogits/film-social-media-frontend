import React, { useEffect, useContext, Fragment } from "react";
import Header from "./Header";
import PostItem from "./../posts/Post";
import PostNew from "./../posts/PostNew";
import UserContext from "./../../context/user/UserContext";
import PostContext from "./../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";
import BottomBar from "./BottomBar"
import { Link } from "react-router-dom";

const Post = (props) => {
  const userContext = useContext(UserContext);
  const { auth, userAuth, user,  } = userContext;

  const postContext = useContext(PostContext);
  const { getPost, postSelect, getPosts, posts, formPostEdit, errormsg,  } = postContext;
  const query = props.location.pathname.split("/");
  const postItem = query[2];

  const replyContext = useContext(ReplyContext);
  const {
    reply, replies
  } = replyContext;

  useEffect(() => {
    userAuth();
    /*
    if (posts.length === 0) {
      if (user) {
        getPosts(null, user);
      }
    }
*/
   
    if(user) {

      if ( postItem === "edit" && query[3] !== "") {
        getPost(query[3], true, user);
      } else {
         
        if(postItem !== "" && postItem !== "edit" )  
        getPost(postItem, false, user);
      }
    
  }
  }, [auth, props.location.pathname, reply, replies]);



  
  return (
    <main className="top-space ">
      <Header></Header>
      <div className="container">
        <div className="content-center">
      
          <div className="box-format ">
          <Link to={"/feed"} className="link-style">
           Regresar
          </Link>
        </div>

        {postSelect ?
          <Fragment>
        
          {!formPostEdit ? (
            <PostItem post={postSelect} />
          ) : (
            <PostNew props={props} />
          )}
        </Fragment>
        : 
        <div className="post-new box-format center">
          {!errormsg ?    <p>La publicación se ha eliminado </p>:    <p>{errormsg} </p>}
       
          </div>
        
        }
        </div>
      </div>
      <BottomBar />
    </main>
  );
};

export default Post;
