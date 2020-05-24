import React, { useContext, useEffect } from "react";
import Header from "./Header";
import ProfileInfo from "./../user/ProfileInfo";
import SignupForm from "./../user/SignupForm";
import PostList from "./../posts/PostList";
import PostNew from "./../posts/PostNew";
import PostContext from "./../../context/post/PostContext";
import UserContext from "./../../context/user/UserContext";
import BottomBar from "./BottomBar";
import ModalDelete from "../templates/ModalDelete";

const Profile = (props) => {
  const userContext = useContext(UserContext);
  const { formEdit, user, userAuth, setPage } = userContext;
  const postContext = useContext(PostContext);
  const { modalDelete } = postContext;

  const query = props.location.pathname.split("/");
  const profile = query[2];

  useEffect(() => {
    userAuth();
    setPage("profile")
    // eslint-disable-next-line
  }, []);
  if (!user) return null;

  return (
    <main className={`post-pro ${modalDelete ? "shadow": null}`}>


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
          <PostNew />
          <PostList creator={user._id} />
        </div>
      </div>
      <ModalDelete />
      <BottomBar props={props} />
    </main>
  );
};
export default Profile;
