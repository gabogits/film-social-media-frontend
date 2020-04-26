import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from "react-router-dom";
import UserContext from "../../context/user/UserContext"

const PrivateRoute = ({Component: Component, ...props}) => {
    const userContext = useContext(UserContext);
    const {auth, userAuth} = userContext;

    useEffect(() => {
        userAuth()
    }, []);

    return (
        <Route {...props} render={(props) => !auth ? <Redirect to="/login"  />: <Component {...props} />} />
    )
}
export default PrivateRoute;