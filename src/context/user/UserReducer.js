import {
  SIGNUP_USER,
  GET_USERS,
  GET_USERBYID,
  UPDATE_USER,
  LOGIN_USER,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USERBYID:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: [action.payload, ...state.user],
      };
    case LOGIN_USER:
      return;
    default:
      return state;
  }
};
