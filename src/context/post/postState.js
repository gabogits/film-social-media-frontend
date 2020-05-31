import React, { useReducer } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import axiosClient from "./../../config/axios";
import { keysAppend } from "../../helpers";

import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_PROFILE,
  GET_POSTS_USER,
  GET_ONEPOST,
  GET_ONEPOSTEDIT,
  UPDATE_POST,
  PREV_DELETE,
  CANCEL_DELETE,
  DELETE_POST,
  CANCEL_POST,
  SCORE_POST,
  RESET_POST_SELECT,
  RESET_POSTS,
  LOADER,
  LOADER_DELETE,
  NO_RESULTS,
  ERRORMSG,
  RESET_POSTS_STATE,
} from "../../types";

const PostState = (props) => {
  const initialState = {
    posts: [],
    postsProfile: [],
    postsUser: [],
    post: null,
    postSelect: null,
    formPostEdit: false,
    limite: 5,
    loader: false,
    results: true,
    errormsg: null,
    deleting: false,
    modalDelete:null,
    itemToDelete: null
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
    if (creator["creator"] === undefined) {
      if (state.posts.length > 0) {
        skip = state.posts.length;
      } else {
        skip = 0;
      }
    } else {
      if (creator["creator"] !== user._id) {
        if (state.postsProfile.length > 0) {
          skip = state.postsProfile.length;
        } else {
          skip = 0;
        }
      } else {
        if (state.postsUser.length > 0) {
          skip = state.postsUser.length;
        } else {
          skip = 0;
        }
      }
    }

    try {
   
      const posts = await axiosClient.get(
        `/api/post?skip=${skip}&limite=${limite}`,
        { params: creator }
      );
       
      const postResp = posts.data;
      let values;
      if (creator["creator"] === undefined) {
        values = [...postResp, ...state.posts];
      } else {
        if (creator["creator"] !== user._id) {
          values = [...postResp, ...state.postsProfile];
        } else {
          values = [...postResp, ...state.postsUser];
        }
      }

      const lookup = values.reduce((a, e) => {
        a[e._id] = ++a[e._id] || 0;
        return a;
      }, {});

      const doubles = values.filter((e) => lookup[e._id]);
      const newArray = [...doubles, ...postResp];
      const postToList = newArray.filter((e) => !lookup[e._id]);
      const totalReplies = { totalReplies: true };
      if (postToList.length) {
        const postTree = [];

        for (const postItem of postToList) {
          const post = postItem._id;

          const repliesPost = await axiosClient.get("api/reply", {
            params: { post, totalReplies },
          });

          postItem.numberReplies = repliesPost.data;
          const evaluation = user.evaluations.find(
            (item) => item.post === post
          );

          if (evaluation) {
            postItem.score = evaluation.score;
          }

          postTree.push(postItem);
        }

        if (creator["creator"] === undefined) {
          dispatch({
            type: GET_POSTS,
            payload: postTree,
          });
        } else {
          if (creator["creator"] !== user._id) {
            dispatch({
              type: GET_POSTS_PROFILE,
              payload: postTree,
            });
          } else {
            dispatch({
              type: GET_POSTS_USER,
              payload: postTree,
            });
          }
        }
      } else {
        dispatch({
          type: NO_RESULTS,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (post, edit, user, page) => {
    try {
      let postSel = await axiosClient.get(`/api/post/${post}`);
      let postItem = postSel.data;
      delete user.password;
      const repliesPost = await axiosClient.get("api/reply", {
        params: { post },
      });
      postItem.numberReplies = repliesPost.data.totalReplies;
      if (repliesPost.data.repliesFromPost.length > 0) {
        postItem.replies = repliesPost.data.repliesFromPost;
      }

      const evaluation = user.evaluations.find((item) => item.post === post);

      if (evaluation) {
        postItem.score = evaluation.score;
      }
      if (edit) {
        dispatch({
          type: GET_ONEPOSTEDIT,
          payload: postItem,
        });
      } else {
        dispatch({
          type: GET_ONEPOST,
          payload: postItem,
        });
      }
    } catch (error) {
      dispatch({
        type: ERRORMSG,
        payload: error.response.data.msg,
      });
    }
  };

  const updatePost = async (postChanged, user, repliesList) => {
    dispatch({
      type: LOADER,
    });
    try {
      delete postChanged.replies;
      delete postChanged.score; //esto esta de mas por solo se asigna el score al post
      const post = postChanged._id;

      const postObj = keysAppend(postChanged);
      const postEdited = await axiosClient.post(`/api/post/${post}`, postObj);
      const postItem = postEdited.data;
      let repliesPost;
      if (repliesList) {
        repliesPost = await axiosClient.get("api/reply", {
          params: { post },
        });
        postItem.numberReplies = repliesPost.data.totalReplies;
        postItem.replies = repliesPost.data.repliesFromPost;
      } else {
        const totalReplies = { totalReplies: true };
        repliesPost = await axiosClient.get("api/reply", {
          params: { post, totalReplies },
        });
        postItem.numberReplies = repliesPost.data;
      }
      const evaluation = user.evaluations.find((item) => item.post === post);

      if (evaluation) {
        postItem.score = evaluation.score;
      }
      dispatch({
        type: UPDATE_POST,
        payload: postItem,
      });
    } catch (error) {}
  };
  const cancelPost = () => {
    dispatch({
      type: CANCEL_POST,
    });
  };
  const prevDelete = (id) => {
    dispatch({
      type: PREV_DELETE,
      payload: id,
    });
  }
  const cancelDelete = (id) => {
    dispatch({
      type: CANCEL_DELETE,
    });
  }
  const deletePost = async () => {
    dispatch({
      type: LOADER_DELETE,
    });
    try {
      const postDelete = await axiosClient.delete(`/api/post/${state.itemToDelete}`);

      dispatch({
        type: DELETE_POST,
        payload: postDelete.data.post,
      });
     
    } catch (error) {}
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
  const resetPostState = () => {
    try {
      dispatch({
        type: RESET_POSTS_STATE,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const scorePost = (_id, score) => {
    const post = {
      _id,
      score,
    };
    dispatch({
      type: SCORE_POST,
      payload: post,
    });
  };

 
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        postsProfile: state.postsProfile,
        postsUser: state.postsUser,
        post: state.post,
        postSelect: state.postSelect,
        formPostEdit: state.formPostEdit,
        loader: state.loader,
        results: state.results,
        errormsg: state.errormsg,
        deleting: state.deleting,
        modalDelete: state.modalDelete,
        itemToDelete:  state.itemToDelete,
        newPost,
        getPosts,
        getPost,
        updatePost,
        cancelPost,
        deletePost,
        resetSelectPost,
        resetPosts,
        resetPostState,
        scorePost,
        prevDelete,
        cancelDelete,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
