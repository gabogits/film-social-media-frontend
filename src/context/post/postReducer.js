import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_PROFILE,
  GET_POSTS_USER,
  GET_ONEPOST,
  GET_ONEPOSTEDIT,
  DELETE_POST,
  UPDATE_POST,
  RESET_POST_SELECT,
  CANCEL_POST,
  RESET_POSTS,
  LOADER,
  NO_RESULTS,
  ERRORMSG,
  PAGE,
  LOADER_DELETE,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        loader: true,
      };
    case LOADER_DELETE:
      return {
        ...state,
        deleting: true,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        postsUser: [action.payload, ...state.postsUser],
        loader: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        results: true,
      };
    case GET_POSTS_PROFILE:
      return {
        ...state,
        postsProfile: [...state.postsProfile, ...action.payload],
        results: true,
      };

    case GET_POSTS_USER:
      return {
        ...state,
        postsUser: [...state.postsUser, ...action.payload],
        results: true,
      };
    case NO_RESULTS:
      return {
        ...state,
        results: false,
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
        postSelect: action.payload,
        posts: state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, ...action.payload }
            : post
        ),
        postsUser: state.postsUser.map((post) =>
          post._id === action.payload._id
            ? { ...post, ...action.payload }
            : post
        ),
        formPostEdit: false,
        loader: false,
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
        postsProfile: [],
      };

    case CANCEL_POST:
      return {
        ...state,
        formPostEdit: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
        deleting: false,
        postSelect: null,
        errormsg: null,
      };
    case ERRORMSG:
      return {
        ...state,
        errormsg: action.payload,
      };
    case PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};
