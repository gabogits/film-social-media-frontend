import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { keysAppend } from "../../helpers";
import tokenAuth from "../../config/token";

import {
  SIGNUP_USER,
  GET_USERS,
  GET_USER,
  GET_USERBYID,
  EDIT_USER,
  UPDATE_USER,
  CANCEL_EDIT_USER,
  SIGN_OUT,
  LOGIN_USER,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  HIDE_ERROR,
} from "./../../types/";
import axiosClient from "../../config/axios";

const UserState = (props) => {
  const initialState = {
    token: null,
    user: null,
    users: [],
    formEdit: false,
    userSelect: null,
    auth: null,
    loading: true,
    message: null,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const signUpUser = async (user) => {
    const userObj = keysAppend(user);
    try {
      const userSignUp = await axiosClient.post("/api/user", userObj);

      dispatch({
        type: SIGNUP_USER,
        payload: userSignUp.data,
      });
      userAuth();
    } catch (error) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: error.response.data.msg,
      });

      setTimeout(() => {
        dispatch({
          type: HIDE_ERROR,
        });
      }, 5000);
    }
  };

  const getUsers = async () => {
    const users = await axiosClient.get("/api/user");
    dispatch({
      type: GET_USERS,
      payload: users.data,
    });
  };
  const getUserById = async (id) => {
    const userProfile = state.users.find((user) => user._id === id);
    dispatch({
      type: GET_USERBYID,
      payload: userProfile,
    });
  };
  const editUser = (user) => {
    dispatch({
      type: EDIT_USER,
      payload: user,
    });
  };

  const updateUser = async (user) => {
    delete user.password;

    const userObj = keysAppend(user);
    const userEdit = await axiosClient.post(`/api/user/${user._id}`, userObj);

    dispatch({
      type: UPDATE_USER,
      payload: userEdit.data,
    });
  };

  const userLogin = async (user) => {
    console.log(user);
    try {
      const userLog = await axiosClient.post("/api/auth", user);
      dispatch({
        type: LOGIN_USER,
        payload: userLog.data,
      });
      userAuth();
    } catch (error) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: error.response.data.msg,
      });

      setTimeout(() => {
        dispatch({
          type: HIDE_ERROR,
        });
      }, 5000);
    }
  };
  const userAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const userAuth = await axiosClient.get("api/auth");
      //aqui en este llamado se mandan los headers el servidor los recibe y busca el token, que se tomo a su vez del localstorage,
      //cuyo token se seteo en el local storage cuando se logueo o cuando se registro cuenta

      dispatch({
        type: GET_USER,
        payload: userAuth.data.userAuth,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };
  const cancelEditUser = async () => {
    dispatch({
      type: CANCEL_EDIT_USER,
    });
  };
  const signOut = async () => {
    dispatch({
      type: SIGN_OUT,
    });
  };

  const setEvaluations = async (evaluation, user, creator) => {
    let evaluations = user.evaluations.filter(
      (item) => item.post !== evaluation.post
    );
    evaluations.push(evaluation);
    user.evaluations = evaluations;

    delete user.password;

    const userEdit = await axiosClient.post(`/api/user/${user._id}`, user);
    dispatch({
      type: UPDATE_USER,
      payload: userEdit.data,
    });

    const creatorPost = state.users.find(
      (userItem) => userItem._id === creator
    );

    let ranking = creatorPost.ranking.filter(
      (item) => item.post !== evaluation.post
    );

    const itemRanking = {
      post: evaluation.post,
      user: user._id,
      score: evaluation.score,
    };
    ranking.push(itemRanking);

    creatorPost.ranking = ranking;

    delete creatorPost.password;

    await axiosClient.post(`/api/user/${creator}`, creatorPost);
    getUsers();
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        formEdit: state.formEdit,
        userSelect: state.userSelect,
        auth: state.auth,
        loading: state.loading,
        message: state.message,
        signUpUser,
        userLogin,
        getUsers,
        getUserById,
        editUser,
        updateUser,
        signOut,
        signOut,
        userAuth,
        setEvaluations,
        cancelEditUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
