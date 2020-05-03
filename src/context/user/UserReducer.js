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
  LOGIN_ERROR
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        users: [action.payload, ...state.users],
        auth: true,
        loading: false,
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
        userSelect: action.payload,
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

        localStorage.removeItem("token");
        localStorage.clear();
        return {
          ...state,
          user: null,
          token:null,
          userSelect:null,
          users:null,        
          auth: false,
          loading: false,
        };
      
    default:
      return state;
  }
};
