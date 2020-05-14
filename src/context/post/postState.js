import React, { useReducer, useContext } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import axiosClient from "./../../config/axios";
import { keysAppend } from "../../helpers";

import {
  CREATE_POST,
  GET_POSTS,
  GET_ONEPOST,
  GET_ONEPOSTEDIT,
  UPDATE_POST,
  DELETE_POST,
  CANCEL_POST,
  RESET_POST_SELECT,
  RESET_POSTS,
  LOADER,
  NO_RESULTS,
} from "../../types";

const PostState = (props) => {
  const initialState = {
    posts: [],
    post: null,
    postSelect: null,
    formPostEdit: false,
    limite: 5,
    loader: false,
    results: true,
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const newPost = async (post) => {
    dispatch({
      type: LOADER,
    });
    const postObj = keysAppend(post);
    try {
      const postItem = await axiosClient.post("/api/post", postObj);

      dispatch({
        type: CREATE_POST,
        payload: postItem.data.post,
      });
    } catch (error) {}
  };
  const getPosts = async (creator, user, pagina) => {
    const limite = state.limite;
    let skip;
    console.log(state.posts.length);
    if (state.posts.length > 0) {
      skip = state.posts.length;
    } else {
      skip = 0;
    }

    const posts = await axiosClient.get(
      `/api/post?skip=${skip}&limite=${limite}`,
      { params: creator }
    );
    console.log(posts);

    if (posts.data.length) {
      const postTree = [];
      for (const postItem of posts.data) {
        const post = postItem._id;

        const repliesPost = await axiosClient.get("api/reply", {
          params: { post },
        });
        postItem.replies = repliesPost.data;
        const evaluation = user.evaluations.find((item) => item.post == post);

        if (evaluation) {
          postItem.score = evaluation.score;
        }

        postTree.push(postItem);

        /*
         const postResp = posts.data;
      const values = [...postResp,  ...state.posts ];

    const lookup = values.reduce((a, e) => {
      a[e._id] = ++a[e._id] || 0;
      return a;
    }, {});
    
    const doubles = values.filter(e => lookup[e._id]);

    const newArray = [...doubles,  ...postResp]
    
    const postToList = newArray.filter(e => !lookup[e._id]);

      
    */
      }

      dispatch({
        type: GET_POSTS,
        payload: postTree,
      });
    } else {
      dispatch({
        type: NO_RESULTS,
      });
    }
  };

  const getPost = async (postId, edit) => {
    const postSel = state.posts.find((post) => post._id === postId);

    if (edit) {
      dispatch({
        type: GET_ONEPOSTEDIT,
        payload: postSel,
      });
    } else {
      dispatch({
        type: GET_ONEPOST,
        payload: postSel,
      });
    }
  };

  const updatePost = async (post) => {
    dispatch({
      type: LOADER,
    });
    console.log(post)
    
    const postObj = keysAppend(post);
    const postEdited = await axiosClient.post(`/api/post/${post._id}`, postObj);
    console.log(postEdited)
    try {
      dispatch({
        type: UPDATE_POST,
        payload: postEdited.data,
      });
    } catch (error) {}
  };
  const cancelPost = () => {
    dispatch({
      type: CANCEL_POST,
    });
  };
  const deletePost = async (post) => {
    dispatch({
      type: LOADER,
    });
    const postDelete = await axiosClient.delete(`/api/post/${post}`);
    try {
      dispatch({
        type: DELETE_POST,
        payload: postDelete.data.post,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const resetSelectPost = () => {
    try {
      dispatch({
        type: RESET_POST_SELECT,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const resetPosts = () => {
    try {
      dispatch({
        type: RESET_POSTS,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        post: state.post,
        postSelect: state.postSelect,
        formPostEdit: state.formPostEdit,
        loader: state.loader,
        results: state.results,
        newPost,
        getPosts,
        getPost,
        updatePost,
        cancelPost,
        deletePost,
        resetSelectPost,
        resetPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
