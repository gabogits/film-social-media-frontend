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
  const { formEdit, user, users, userAuth, getUserById, getUsers, userSelect } = userContext;

  const query = props.location.pathname.split("/")
  const profile = query[2];

useEffect( () =>{
  userAuth();
  getUsers();
  if(profile && users){
      getUserById(profile)
  }
 }, [profile])
   if(!user) return null;
  return (
    <div>
      <h2>Este va ser el Profile</h2>
      <Header></Header>
      <UsersList users={users} />
      
      {!formEdit ? <ProfileInfo profileInfo={userSelect ? userSelect  : user} />  :  <SignupForm />}
      {!profile || profile === user._id ? <PostNew /> : null }
      <PostList creator = {profile ? profile : user._id}  />
    
    </div>
  );
};
export default Profile;
