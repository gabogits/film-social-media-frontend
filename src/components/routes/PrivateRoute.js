import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/user/UserContext";

const PrivateRoute = ({ component: Component, ...props }) => {
  const userContext = useContext(UserContext);
  const { auth, loading, userAuth } = userContext;

  useEffect(() => {
    userAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !auth && !loading ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
export default PrivateRoute;
