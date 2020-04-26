import React, {useContext} from "react";
import Header from "./Header";
import ProfileInfo from "./../user/ProfileInfo";
import SignupForm from "./../user/SignupForm";
import UsersList from "./../user/UsersList";
import PostList from "./../posts/PostList";
import UserContext from "./../../context/user/UserContext";


const Profile = () => {
  const userContext = useContext(UserContext)
const {formEdit} = userContext;
  return (
    <div>
      <h2>Este va ser el Profile</h2>
      <Header></Header>
      <ProfileInfo />
      
      {formEdit ? (<SignupForm  />) : null}
 
    </div>
  );
};
/*
      <PostList />
      */
export default Profile;
