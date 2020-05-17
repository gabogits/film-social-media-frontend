import React, { useContext, useEffect } from "react";
import Header from "./Header";
import ProfileInfo from "./../user/ProfileInfo";
import SignupForm from "./../user/SignupForm";
import PostContext from "../../context/post/PostContext";
import PostList from "./../posts/PostList";
import PostNew from "./../posts/PostNew";
import UserContext from "./../../context/user/UserContext";

import BottomBar from "./BottomBar";

const Profile = (props) => {
  const userContext = useContext(UserContext);
  const {
    formEdit,
    user,
    userAuth,
    resetProfile,
    profileSelect
  } = userContext;

  const query = props.location.pathname.split("/");
  const profile = query[2];
  const postContext = useContext(PostContext);


  useEffect(() => {
    userAuth();
  
  }, []);
  if (!user) return null;

  return (
    <main className="post-pro">
      <Header></Header>

      {!formEdit ? (
        <ProfileInfo profile={profile} />
      ) : (
        <div class="content-center">
          <SignupForm />
        </div>
      )}

      <div className="container display">
        <div className="content-center">
          {!profile || profile === user._id ? <PostNew /> : null}
          <PostList creator={profile ? profile : user._id}  />
        </div>
      </div>
      <BottomBar />
    </main>
  );
};
export default Profile;
