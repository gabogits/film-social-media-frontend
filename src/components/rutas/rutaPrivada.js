import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from "react-router-dom";
import AuthContext from "./../context/autentication/AuthContext";

const privateRoute = ({Component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const {logged, userLogged} = authContext;

    useEffect(() => {
        userLogged()
    }, []);

    return (
        <Route {...props} render={(props) => !logged ? <Redirect to="/login"  />: <Component {...props} />} />
    )
}
export default privateRoute;