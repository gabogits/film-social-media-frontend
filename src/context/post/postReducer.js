import {
  CREATE_POST,
  GET_POSTS,
  GET_ONEPOST,
  GET_ONEPOSTEDIT,
  DELETE_POST,
  UPDATE_POST,
  RESET_POST_SELECT,
  CANCEL_POST,
  RESET_POSTS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_ONEPOST:
      return {
        ...state,
        postSelect: action.payload,
        formPostEdit: false,
      };
    case GET_ONEPOSTEDIT:
      return {
        ...state,
        postSelect: action.payload,
        formPostEdit: true,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: [],
        post: action.payload,
        formPostEdit: false,
        postSelect: null,
      };
    case RESET_POST_SELECT:
      return {
        ...state,
        postSelect: null,
        formPostEdit: false,
      };
    case RESET_POSTS:
      return {
        ...state,
        posts: [],
      };

    case CANCEL_POST:
      return {
        ...state,
        formPostEdit: false,
        postSelect: null,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    default:
      return state;
  }
};
