import React, { useReducer } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import axiosClient from "./../../config/axios";

import { CREAR_POST, GET_POST } from "../../types";

const PostState = (props) => {
  const initialState = {
    posts: [],
    post: null,
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
      dispatch({
        type: CREAR_POST,
        payload: postItem.data.post,
      });
    } catch (error) {
      console.log(error)
    }
   
  };
  const getPosts = async () => {
    const posts = await axiosClient.get('/api/post');


    dispatch({
      type: GET_POST,
      payload: posts.data
    })
  }
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        newPost,
        getPosts
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
