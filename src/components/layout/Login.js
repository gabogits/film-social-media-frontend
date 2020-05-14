import React, { useEffect, useContext } from "react";
import LoginForm from "./../user/LoginForm";
import Header from "./Header";
import UserContext from "./../../context/user/UserContext";

const Login = (props) => {
  const userContext = useContext(UserContext);
  const { auth } = userContext;
  useEffect(() => {
    if (auth) {
      props.history.push("/feed");
    }
  }, [auth, props.history]);

  return (
    <main className="top-space pad-bottom" >
      <Header />
      <LoginForm />
      <div className="back-full back-2">
        
        </div>
    </main>
  );
};

export default Login;
