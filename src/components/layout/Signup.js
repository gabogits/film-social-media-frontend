import React, {useEffect, useContext} from "react";
import Header from "./Header";
import SignupForm from "./../user/SignupForm";
import UserContext from "./../../context/user/UserContext";

const SignUp = (props) => {
  const userContext = useContext(UserContext);
  const {  auth, userSelect, userAuth, user, token, loading } = userContext;
  useEffect(() => {

 
  
  }, [auth, userSelect, token, props.history]);

  return (
    <div>
      <Header />
      <SignupForm />
    </div>
  );
};

export default SignUp;
