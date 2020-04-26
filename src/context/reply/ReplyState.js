import React, { useReducer } from "react";
import {
  CREATE_REPLY,
  GET_REPLIES,
  GET_ONEREPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  CANCEL_EDITREPLY,
} from "../../types";
import ReplyContext from "./ReplyContext";
import ReplyReducer from "./ReplyReducer";
import axiosClient from "../../config/axios";
import {keysAppend } from "../../helpers/";

const ReplyState = (props) => {
  const initialState = {
    replies: [],
    reply: null,
    selectReply: null,
    formReplyEdit: false,
  };

  const [state, dispatch] = useReducer(ReplyReducer, initialState);

  const newReply = async (reply) => {
    const replyObj = keysAppend(reply);
    const replyItem = await axiosClient.post("api/reply", replyObj);

    try {
      dispatch({
        type: CREATE_REPLY,
        payload: replyItem.data.reply,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getReplies = async (idPost) => {
    console.log(idPost);
    // const repliesPost = await  axiosClient.get("api/reply", {params: {idPost}});

    const repliesPost = await axiosClient.get("api/reply");
    console.log(repliesPost);
    dispatch({
      type: GET_REPLIES,
      payload: repliesPost.data,
    });
  };

  const getReply = (reply) => {
    dispatch({
      type: GET_ONEREPLY,
      payload: reply,
    });
  };
  const updateReply = async (reply) => {
    const replyObj = keysAppend(reply);
    const replyEdit = await axiosClient.post(`api/reply/${reply._id}`, replyObj);

    dispatch({
      type: UPDATE_REPLY,
      payload: replyEdit.data,
    });
  };
  const cancelEdit = () => {
    dispatch({
      type: CANCEL_EDITREPLY,
    });
  }
  const deleteReply = async (reply) => {
    const replyDelete = await axiosClient.delete(`api/reply/${reply._id}`);
    console.log(replyDelete)
    try {
      dispatch({
        type: DELETE_REPLY,
        payload: replyDelete.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ReplyContext.Provider
      value={{
        replies: state.replies,
        selectReply: state.selectReply,
        formReplyEdit: state.formReplyEdit,
        newReply,
        getReplies,
        getReply,
        updateReply,
        deleteReply,
        cancelEdit
      }}
    >
      {props.children}
    </ReplyContext.Provider>
  );
};

export default ReplyState;
