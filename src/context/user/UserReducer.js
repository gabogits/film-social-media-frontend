import {
  SIGNUP_USER,
  GET_USERS,
  GET_USER,
  GET_USERBYID,
  UPDATE_USER,
  CANCEL_EDIT_USER,
  LOGIN_USER,
  EDIT_USER,
  SIGN_OUT,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  HIDE_ERROR,
  LOADER,
  RESET_PROFILE,
  SET_PAGE,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        loader: true,
      };
    case SIGNUP_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        users: [...state.users, action.payload.newUser],
        auth: true,
        loading: false,
        loader: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        token: localStorage.getItem("token"),
        user: action.payload,
        auth: true,
        loading: false,
      };

    case GET_USERBYID:
      return {
        ...state,
        profileSelect: action.payload,
      };
    case EDIT_USER:
      return {
        ...state,
        formEdit: true,
        userSelect: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        formEdit: false,
        loader: false,
      };
    case CANCEL_EDIT_USER:
      return {
        ...state,
        formEdit: false,
      };
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        loading: false,
      };
    case LOGIN_ERROR:
    case SIGN_OUT:
    case SIGNUP_ERROR:
      localStorage.removeItem("token");
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null,
        userSelect: null,
        users: null,
        auth: false,
        loading: false,
        message: action.payload,
        loader: false,
      };
    case HIDE_ERROR:
      return {
        ...state,
        message: null,
      };
    case RESET_PROFILE:
      return {
        ...state,
        profileSelect: null,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
};
