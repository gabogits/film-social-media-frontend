import React, { useContext, useEffect } from "react";
import Header from "./Header";
import ProfileInfo from "./../user/ProfileInfo";
import SignupForm from "./../user/SignupForm";
import UsersList from "./../user/UsersList";
import PostList from "./../posts/PostList";
import PostNew from "./../posts/PostNew";
import UserContext from "./../../context/user/UserContext";


const Profile = (props) => {
  const userContext = useContext(UserContext);
  const { formEdit, auth, user, userAuth, getUserById, userSelect } = userContext;

  const query = props.location.pathname.split("/")
  const profile = query[2];

useEffect( () =>{
  userAuth();
  if (!auth) {
    props.history.push("/");
  }
  if(auth && profile){
      getUserById(profile)
  }
 }, [profile, auth, props.history])
  if(!auth) return null; 
  return (
    <div>
      <h2>Este va ser el Profile</h2>
      <Header></Header>
      <UsersList />
      
      {!formEdit ? <ProfileInfo profileInfo={userSelect ? userSelect  : user} />  :  <SignupForm />}
      {!profile || profile === user._id ? <PostNew /> : null }
      <PostList creator = {profile ? profile : user._id}  />
    
    </div>
  );
};
/*
      <PostList />
      */
export default Profile;
