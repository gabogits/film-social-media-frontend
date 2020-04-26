import { CREATE_POST, GET_POSTS, GET_ONEPOST, DELETE_POST, UPDATE_POST, CANCEL_POST } from "../../types";

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
        formPostEdit: true,
      };
    case UPDATE_POST:
      return {
        ...state,
        post: action.payload,
        formPostEdit: false,
      };

      case CANCEL_POST:
        return {
          ...state,
          formPostEdit: false,
        };
        case DELETE_POST:
            return {
              ...state,
              posts: state.posts.filter((post) => post._id !== action.payload._id )
            };
    default:
      return state;
  }
};
