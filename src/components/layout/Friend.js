import React, { useContext, useEffect } from "react";
import Header from "./Header";
import ProfileInfo from "./../user/ProfileInfo";
import SignupForm from "./../user/SignupForm";
import PostContext from "../../context/post/PostContext";
import PostList from "./../posts/PostList";
import UserContext from "./../../context/user/UserContext";

import BottomBar from "./BottomBar";

const Profile = (props) => {
  const userContext = useContext(UserContext);
  const { formEdit, user, userAuth, resetProfile } = userContext;

  const query = props.location.pathname.split("/");
  const profile = query[2];
  const postContext = useContext(PostContext);
  const { resetPosts } = postContext;

  useEffect(() => {
    userAuth();
    return () => {
      resetProfile();
      resetPosts();
    };
  }, [props.location]);
  if (!user) return null;

  return (
    <main className="post-pro">
      <Header props={props}></Header>

      {!formEdit ? (
        <ProfileInfo profile={profile} />
      ) : (
        <div className="content-center">
          <SignupForm />
        </div>
      )}

      <div className="container display">
        <div className="content-center">
          <PostList creator={profile} />
        </div>
      </div>
      <BottomBar props={props} />
    </main>
  );
};
export default Profile;
