import React, { useEffect, useContext } from "react";
import Header from "./Header";
import SignupForm from "./../user/SignupForm";
import UserContext from "./../../context/user/UserContext";

const SignUp = (props) => {
  const userContext = useContext(UserContext);
  const { auth } = userContext;
  useEffect(() => {
    if (auth) {
      props.history.push("/feed");
    }
  }, [auth, props.history]);

  return (
    <main className="top-space pad-bottom">
      <Header props={props} />
      <div className="logo">
      <img src=".`./../../faves_logo.svg" alt="logo" />
      </div>
      <SignupForm />
      <div className="back-full back-1" />
    </main>
  );
};

export default SignUp;
