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
    postSelect: null,
    formPostEdit: false
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const newPost =  async (post) => {
    console.log(post)
    const objPost = keysAppend(post)
    console.log(objPost)
    try {
      const postItem = await axiosClient.post('/api/post', objPost )
    
      dispatch({
        type: CREATE_POST,
        payload: postItem.data.post,
      });
    } catch (error) {
      console.log(error)
    }
   
  };
  const getPosts = async (creator) => {
    const posts = await axiosClient.get('/api/post', {params: creator});
    console.log(posts)
  
        console.log(creator)
    const postTree = [];
    for (const postItem of posts.data) {
        const post  = postItem._id;
        console.log(post)
        const repliesPost = await  axiosClient.get("api/reply", {params: {post}});
        postItem.replies = repliesPost.data;
        postTree.push(postItem)

     
    }
    console.log(postTree)
   
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
