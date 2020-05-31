import React, { useReducer } from "react";
import {
  CREATE_REPLY,
  GET_ONEREPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  CANCEL_EDITREPLY,
  LOADER,
  CLOSE_LOADER,
  PREV_DELETE_REPLY,
  CANCEL_DELETE_REPLY
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
    modalDeleteReply:null,
    itemToDelete: null
  };

  const [state, dispatch] = useReducer(ReplyReducer, initialState);

  const newReply = async (reply) => {
    dispatch({
      type: LOADER,
    });


    try {
      const replyObj = keysAppend(reply);

      const replyItem = await axiosClient.post("api/reply", replyObj);
      dispatch({
        type: CREATE_REPLY,
        payload: replyItem.data.reply,
      });
    } catch (error) {
      console.log(error);
      closeLoader();
    }
  };

  const getReplies = async (post) => {};

  const getReply = (reply) => {
    try {
      dispatch({
        type: GET_ONEREPLY,
        payload: reply,
      });
    } catch (error) {
      closeLoader();
    }
   
  };
  const updateReply = async (reply) => {
    try {
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
    } catch (error) {
      closeLoader();
    }
  };
  const cancelEdit = () => {
    try {
      dispatch({
        type: CANCEL_EDITREPLY,
      });
    } catch (error) {
      closeLoader();
    }
  
  };
  const prevDelete = (id) => {
    dispatch({
      type: PREV_DELETE_REPLY,
      payload: id,
    });
  }
  const cancelDelete = (id) => {
    dispatch({
      type: CANCEL_DELETE_REPLY,
    });
  }
  const deleteReply = async () => {
    dispatch({
      type: LOADER,
    });
    try {   
    const replyDelete = await axiosClient.delete(`api/reply/${state.itemToDelete}`);
      dispatch({
        type: DELETE_REPLY,
        payload: replyDelete.data,
      });
    } catch (error) {
      console.log(error);
      closeLoader();
    }
  };
  const closeLoader = async () => {
    dispatch({
      type: CLOSE_LOADER,
    });
  };

  return (
    <ReplyContext.Provider
      value={{
        replies: state.replies,
        selectReply: state.selectReply,
        formReplyEdit: state.formReplyEdit,
        loader: state.loader,
        reply: state.reply,
        modalDeleteReply: state.modalDeleteReply,
        itemToDelete:  state.itemToDelete,
        newReply,
        getReplies,
        getReply,
        updateReply,
        deleteReply,
        cancelEdit,
        prevDelete,
        cancelDelete,
      }}
    >
      {props.children}
    </ReplyContext.Provider>
  );
};

export default ReplyState;
