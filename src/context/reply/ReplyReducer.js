import {
  CREATE_REPLY,
  GET_REPLIES,
  GET_ONEREPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  CANCEL_EDITREPLY,
} from "../../types/";

export default (state, action) => {
  switch (action.type) {
    case CREATE_REPLY:
      return {
        ...state,
        replies: [action.payload, ...state.replies],
      };
    case GET_REPLIES:
      return {
        ...state,
        replies: action.payload,
      };
    case GET_REPLIES:
      return {
        ...state,
        replies: action.payload,
      };
    case GET_ONEREPLY:
      return {
        ...state,
        selectReply: action.payload,
        formReplyEdit: true,
      };
    case UPDATE_REPLY:
      return {
        ...state,
        reply: action.payload,
        formReplyEdit: false,
      };
    case DELETE_REPLY:
      return {
        ...state,
        replies: state.replies.filter(reply => reply._id !== action.payload._id)
      };
    case CANCEL_EDITREPLY:
      return {
        ...state,
        formReplyEdit: false,
      };
    default:
      return state;
  }
};
