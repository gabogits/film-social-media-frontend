import React, { useReducer } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import axiosClient from "./../../config/axios";
import { keysAppend } from "../../helpers";

import { CREATE_POST,  GET_POSTS, GET_ONEPOST, UPDATE_POST, DELETE_POST, CANCEL_POST } from "../../types";

const PostState = (props) => {
  const initialState = {
    posts: [],
    post: null,
    postSelect: "",
    formPostEdit: false
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const newPost =  async (post) => {
     const {text, picture, score } = post;
     console.log(post)
    let data = new FormData();
    data.append("text", text);
    data.append("picture", picture);
    data.append("score", score);
    
    try {
      const postItem = await axiosClient.post('/api/post',  data )
      console.log( postItem.data.post)
      dispatch({
        type: CREATE_POST,
        payload: postItem.data.post,
      });
    } catch (error) {
      console.log(error)
    }
   
  };
  const getPosts = async () => {
    const posts = await axiosClient.get('/api/post');
    console.log(posts)
    dispatch({
      type: GET_POSTS,
      payload: posts.data
    })
  }

  const getPost = post => {
    dispatch({
      type:GET_ONEPOST,
      payload:post
    })
  }

  const updatePost = async post => {
   const postObj = keysAppend(post);   
   const postEdited = await axiosClient.post(`/api/post/${post._id}`,  postObj)
    try {
      dispatch({
        type:UPDATE_POST,
        payload:postEdited.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  const cancelPost  = () => {
    dispatch({
      type:CANCEL_POST,
    })
  }
  const deletePost = async post => {
    const postDelete = await axiosClient.delete(`/api/post/${post._id}`);
    try {
      dispatch({
        type:DELETE_POST,
        payload: postDelete.data.post
      })
    }catch(error) {
      console.log(error)
    }
  }
  
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        post: state.post,
        postSelect: state.postSelect,
        formPostEdit: state.formPostEdit,
        newPost,
        getPosts,
        getPost,
        updatePost,
        cancelPost,
        deletePost
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
