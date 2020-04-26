import React, { useReducer, useContext } from "react";
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
  SIGN_OUT,
  LOGIN_USER
} from "./../../types/";
import axiosClient from "../../config/axios";

const UserState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: {
      avatar: "n/a",
      email: "genial@test.com",
      name: "mi chavo",
      password: "$2a$10$g7d0HWf1dQBHl8TCQ08ig.C2CEooeyw1/utDmItIH0c/kbmnwtb5S",
      registry: "2020-04-23T16:25:21.029Z",
      __v: 0,
      _id: "5ea1f5140693610259f4962c",
      description: "hola que tal"
    },
    users: [],
    formEdit: false,
    userSelect: null,
    auth: false,
    loading:false
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);



  const signUpUser = async (user) => {
    const userObj = keysAppend(user);
    const userSignUp = await axiosClient.post("/api/user", userObj);
    console.log(userSignUp);

    dispatch({
      type: SIGNUP_USER,
      payload: userSignUp.data.newUser,
    });
    userAuth()
  };

  const getUsers = async () => {
    const users = await axiosClient.get("/api/user");
    dispatch({
      type: GET_USERS,
      payload: users.data,
    });
  };
  const getUserById = async (id) => {
    const user = await axiosClient.get(`/api/user/${id}`);
    console.log(user);
    dispatch({
      type: GET_USERBYID,
      payload: user.data,
    });
  };
  const editUser = (user) => {
    dispatch({
      type: EDIT_USER,
      payload: user,
    });
  };

  const updateUser = async (user) => {
    const userObj = keysAppend(user);

    const userEdit = await axiosClient.post(`/api/user/${user._id}`, userObj);
    console.log(userEdit);
    dispatch({
      type: UPDATE_USER,
      payload: userEdit.data,
    });
  };

  const userLogin =  async user => {
    const userLog = await axiosClient.post("api/auth" , user);
    console.log(userLog)
    try {
      dispatch({
        type: LOGIN_USER,
        payload: userLog.data.userAuth,
      });
      userAuth();
    } catch (error) {
      console.log(error)
    }
  
  } 
  const userAuth = async  () => {
    const token = localStorage.getItem("token");
    if(token) {
      tokenAuth(token)
    }
    try {
      const userAuth = await axiosClient.get("api/auth");
      //aqui en este llamado se mandan los headers el servidor los recibe y busca el token, que se tomo a su vez del localstorage, 
      //cuyo token se seteo en el local storage cuando se logueo o cuando se registro cuenta
       dispatch({
         type:GET_USER,
         payload: userAuth.data.userAuth
       })
    } catch (error) {
      console.log(error)
    }

  }

  const signOut = () =>{
    dispatch({
      type:SIGN_OUT,
    })
  }




  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        formEdit: state.formEdit,
        userSelect: state.userSelect,
        auth: state.auth,
        loading:state.loading,
        signUpUser,
        userLogin,
        getUsers,
        getUserById,
        editUser,
        updateUser,
        signOut,
        signOut
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
