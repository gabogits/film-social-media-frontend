import React, { useReducer } from "react";
import {
  CREATE_REPLY,
  GET_ONEREPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  CANCEL_EDITREPLY,
  LOADER
} from "../../types";
import ReplyContext from "./ReplyContext";
import ReplyReducer from "./ReplyReducer";
import axiosClient from "../../config/axios";
import { keysAppend } from "../../helpers/";

const ReplyState = (props) => {
  const initialState = {
    replies: [],
    reply: null,
    selectReply: null,
    formReplyEdit: false,
    loader: false,
  };

  const [state, dispatch] = useReducer(ReplyReducer, initialState);

  const newReply = async (reply) => {
    dispatch({
      type: LOADER,
    });
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

  const getReplies = async (post) => {};

  const getReply = (reply) => {
    dispatch({
      type: GET_ONEREPLY,
      payload: reply,
    });
  };
  const updateReply = async (reply) => {
    dispatch({
      type: LOADER,
    });
    const replyObj = keysAppend(reply);

    const replyEdit = await axiosClient.post(
      `api/reply/${reply._id}`,
      replyObj
    );

    dispatch({
      type: UPDATE_REPLY,
      payload: replyEdit.data,
    });
  };
  const cancelEdit = () => {
    dispatch({
      type: CANCEL_EDITREPLY,
    });
  };
  const deleteReply = async (reply) => {
    dispatch({
      type: LOADER,
    });
    const replyDelete = await axiosClient.delete(`api/reply/${reply._id}`);
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
        loader: state.loader,
        newReply,
        getReplies,
        getReply,
        updateReply,
        deleteReply,
        cancelEdit,
      }}
    >
      {props.children}
    </ReplyContext.Provider>
  );
};

export default ReplyState;
