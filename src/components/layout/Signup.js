import React, {useEffect, useContext} from "react";
import Header from "./Header";
import SignupForm from "./../user/SignupForm";
import UserContext from "./../../context/user/UserContext";

const SignUp = (props) => {
  const userContext = useContext(UserContext);
  const {  auth, userSelect } = userContext;
  useEffect(() => {
    if(auth  &&  userSelect === null ) {
       props.history.push('/feed')
    }
  
  }, [auth, userSelect, props.history]);

  return (
    <div>
      <Header />
      <SignupForm />
    </div>
  );
};

export default SignUp;
