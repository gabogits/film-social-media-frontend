import React, { useReducer } from "react";
import { CREATE_REPLY, GET_REPLIES } from "../../types";
import ReplyContext from "./ReplyContext";
import ReplyReducer from "./ReplyReducer";
import axiosClient from "../../config/axios";

const ReplyState = (props) => {
  const initialState = {
    replies: [],
    reply: null,
  };

  const [state, dispatch] = useReducer(ReplyReducer, initialState);

  const newReply = async (reply) => {
    console.log(reply.post)
    const {text, picture, post} = reply;
    const data = new FormData();
    data.append("text", text )
    data.append("picture", picture)
    data.append("post", post)

    const replyItem = await axiosClient.post("api/reply", data);

    try {
      dispatch({
        type: CREATE_REPLY,
        payload: replyItem.data.reply,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getReplies = async idPost => {
    console.log(idPost)
    const repliesPost = await  axiosClient.get("api/reply", {params: {idPost}});
    console.log(repliesPost)
    dispatch({
      type:GET_REPLIES,
      payload: repliesPost.data
    })

  };

  return (
    <ReplyContext.Provider
      value={{ replies: state.replies, newReply, getReplies }}
    >
        {props.children}

    </ReplyContext.Provider>
  );
};

export default ReplyState;
