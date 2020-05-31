import {
  CREATE_REPLY,
  GET_REPLIES,
  GET_ONEREPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  CANCEL_EDITREPLY,
  LOADER,
  CLOSE_LOADER,
  PREV_DELETE_REPLY,
  CANCEL_DELETE_REPLY
} from "../../types/";

export default (state, action) => {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        loader: true,
      };
    case CREATE_REPLY:
      return {
        ...state,
        replies: [action.payload, ...state.replies],
        reply: action.payload,
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
      case PREV_DELETE_REPLY:  
      return {
        ...state,
        modalDeleteReply: true,
        itemToDelete: action.payload,
      };
      case CANCEL_DELETE_REPLY:  
      return {
        ...state,
        modalDeleteReply: false,
        itemToDelete: null,
      }; 
    case DELETE_REPLY:
      return {
        ...state,
        replies: state.replies.filter(
          (reply) => reply._id !== action.payload._id
        ),
        loader: false,
        modalDeleteReply: false,
        itemToDelete: null,
      };
    case CANCEL_EDITREPLY:
      return {
        ...state,
        formReplyEdit: false,
        selectReply: null,
      };
      case CLOSE_LOADER:
        return {
          ...state,
          loader: false,
        };
    default:
      return state;
  }
};
