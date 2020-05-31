import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_PROFILE,
  GET_POSTS_USER,
  GET_ONEPOST,
  GET_ONEPOSTEDIT,
  DELETE_POST,
  PREV_DELETE,
  CANCEL_DELETE,
  UPDATE_POST,
  SCORE_POST,
  RESET_POST_SELECT,
  CANCEL_POST,
  RESET_POSTS,
  RESET_POSTS_STATE,
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
        posts: [...state.posts, ...action.payload  ],
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
    case SCORE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, score: action.payload.score }
            : post
        ),
        postsProfile: state.postsProfile.map((post) =>
          post._id === action.payload._id
            ? { ...post, ...action.payload }
            : post
        ),

        postSelect: state.postSelect
          ? { ...state.postSelect, score: action.payload.score }
          : null,
      };

    case RESET_POST_SELECT:
      return {
        ...state,
        postSelect: null,
        formPostEdit: false,
        loader:false,
        errormsg: null,
        deleting: false,
        modalDelete: false,
        itemToDelete: null,
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
      case PREV_DELETE:  
      return {
        ...state,
        modalDelete: true,
        itemToDelete: action.payload,
      };
      case CANCEL_DELETE:  
      return {
        ...state,
        modalDelete: false,
        itemToDelete: null,
      }; 
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
        postsUser: state.postsUser.filter((post) => post._id !== action.payload._id),
        deleting: false,
        postSelect: null,
        errormsg: null,
        modalDelete: false,
        itemToDelete: null,
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
    case RESET_POSTS_STATE:
      return {
        ...state,
        posts: [],
        postsProfile: [],
        postsUser: [],
        post: null,
        postSelect: null,
        formPostEdit: false,
        limite: 7,
        loader: false,
        results: true,
        errormsg: null,
        deleting: false,
        modalDelete: false,
        itemToDelete: null,
      };

    default:
      return state;
  }
};
