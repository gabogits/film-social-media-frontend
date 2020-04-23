import React, { useReducer, useContext } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import {keysAppend} from "../../helpers"

import {SIGNUP_USER, GET_USERS, GET_USERBYID, LOGIN_USER, UPDATE_USER} from "./../../types/";
import axiosClient from "../../config/axios";

const UserState = (props) => {
  const initialState = {
    user: "",
    users: [],
  };

  const signUpUser = async user => {
        const userObj = keysAppend(user);
        const userSignUp = await  axiosClient.post("/api/user", userObj );
        console.log(userSignUp)
        
      dispatch({
          type:SIGNUP_USER,
          payload: userSignUp.data.newUser
      })
  }
  const getUsers = async () => {
    const users = await  axiosClient.get("/api/user");
    dispatch({
        type:GET_USERS,
        payload: users.data
    })
  }
  const getUserById = async id => {
    const user = await  axiosClient.get(`/api/user/${id}`);
    console.log(user)
    dispatch({
        type:GET_USERBYID,
        payload: user.data
    })
  }
  const updateUser = async (user, id) => {
    const userObj = keysAppend(user);
    const userEdit = await axiosClient.post(`/api/user/${id}`, userObj);
    console.log(userEdit);
    dispatch({
        type:UPDATE_USER,
        payload: userEdit.data.user
    })

  }

  const logInUser = async user => {
  
    const userLogIn = await axiosClient.post("/api/auth", user);
    console.log(userLogIn)
   
  }


  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{
        user: state.user,
        users: state.users,
        signUpUser,
        getUsers,
        getUserById,
        updateUser
       
    }}>{props.children}</UserContext.Provider>
  );
};

export default UserState;
