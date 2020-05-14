import {
  CREATE_REPLY,
  GET_REPLIES,
  GET_ONEREPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  CANCEL_EDITREPLY,
  LOADER
} from "../../types/";

export default (state, action) => {
  switch (action.type) {
    case LOADER: 
    return {
      ...state,
      loader: true,
    }
    case CREATE_REPLY:
      return {
        ...state,
        replies: [action.payload, ...state.replies],
        loader: false,
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
        selectReply: null,
        loader: false,
      };
    case DELETE_REPLY:
      return {
        ...state,
        replies: state.replies.filter(
          (reply) => reply._id !== action.payload._id
        ),
        loader: false,
      };
    case CANCEL_EDITREPLY:
      return {
        ...state,
        formReplyEdit: false,
        selectReply: null,
      };
    default:
      return state;
  }
};
