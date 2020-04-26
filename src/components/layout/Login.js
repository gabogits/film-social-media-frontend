import React, {useEffect, useContext} from "react";
import LoginForm from "./../user/LoginForm";
import Header from "./Header";
import UserContext from "./../../context/user/UserContext";

const Login = (props) => {
  const userContext = useContext(UserContext);
  const {  auth } = userContext;
  useEffect(() => {
    console.log(auth)
   if(auth) {
     props.history.push('/feed')
   }
  }, [ auth, props.history])
  
  return (
    <div>
      <Header />
      <LoginForm />
    </div>
  );
};

export default Login;
