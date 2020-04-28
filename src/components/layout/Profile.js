import React, { useContext, useEffect } from "react";
import Header from "./Header";
import ProfileInfo from "./../user/ProfileInfo";
import SignupForm from "./../user/SignupForm";
import UsersList from "./../user/UsersList";
import PostList from "./../posts/PostList";
import UserContext from "./../../context/user/UserContext";

const Profile = (props) => {
  const userContext = useContext(UserContext);
  const { formEdit, auth, user, userAuth } = userContext;
  useEffect(()=> {
    userAuth();
    //eslint-disable-next-line
  }, [])
 if(!auth) return null;
 console.log(user)
  return (
    <div>
      <h2>Este va ser el Profile</h2>
      <Header></Header>
      <ProfileInfo />
      <PostList creator = {user._id}  />
      {formEdit ? <SignupForm /> : null}
    </div>
  );
};
/*
      <PostList />
      */
export default Profile;
