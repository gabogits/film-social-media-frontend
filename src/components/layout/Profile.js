import React from "react";
import Header from "./Header";
import ProfileInfo from "./../user/ProfileInfo";
import SignupForm from "./../user/SignupForm";
import UsersList from "./../user/UsersList";
import PostList from "./../posts/PostList";

const Profile = () => {
  return (
    <div>
      <h2>Este va ser el Profile</h2>
      <Header></Header>
      <ProfileInfo />
      <UsersList />
      <SignupForm />
      <PostList />
    </div>
  );
};

export default Profile;
