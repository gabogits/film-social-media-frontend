import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import UserContext from "./../../context/user/UserContext";

const Header = () => {
  const userContext = useContext(UserContext);
  const { signOut, user } = userContext;

  return (
    <header className={user ? "private": "public"}>
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
          <ul>
            {!user ? (
              <Fragment>
                <li>
                  <Link to={"/login"}>Inicia sesión</Link>
                </li>
                <li>
                  <Link to={"/"}>Crea tu cuenta</Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="hide-mobile">
                  <Link to={"/feed"}>Inicio</Link>
                </li>
                <li className="hide-mobile">
                  <Link to={"/profile"}>Perfil</Link>
                </li>
                <li className="hide-mobile">
                  <a href="#!" onClick={signOut}> Cerrar sesión</a>
                </li>
                <li>
                  <div className="menu-user">
                  
                    <span>
                    <Link to={"/profile"}>
                      Hola <strong>{user.name}</strong>
                      </Link>
                    </span>
                    <div className="avatar-small-2">
                    <Link to={"/profile"}>
                    <img
                      src={
                        user.avatar !== "n/a" && user.avatar !== undefined
                          ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${user.avatar}`
                          : `./no-avatar.svg`
                      }
                      alt="img"
                    />
                    </Link>
                  </div>
                    </div>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
