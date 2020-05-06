import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import UserContext from "./../../context/user/UserContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const { signOut, user } = userContext;

  return (
    <header>
      <div className="container">
        <div className="header-logo">
          {user ? (
            <Link to={"/feed"}>
              <img
                width="30px"
                src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${user.avatar}`}
              />
            </Link>
          ) : null}
        </div>

        <div className="user-active">
          {user ? <p>hola {user.name} </p> : null}
        </div>
        <ul>
          {!user ? (
            <Fragment>
              <li>
                <Link to={"/login"}>Iniciar sesión</Link>
              </li>
              <li>
                <Link to={"/"}>Crear cuenta</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link to={"/feed"}>Inicio</Link>
              </li>
              <Link to={"/profile"}>Profile</Link>
              <div onClick={signOut}>Cerrar sesión</div>
            </Fragment>
          )}
        </ul>
      </div>
    </header>
  );
};
export default Header;
