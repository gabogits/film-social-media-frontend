import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import UserContext from "./../../context/user/UserContext";

const Header = ({ props }) => {
  const userContext = useContext(UserContext);
  const { signOut, user } = userContext;
  const query = props.location.pathname.split("/");
  const postItem = query[1];
  const back = () => {
    props.history.go(-1);
  };
  return (
    <header className={user ? "private" : "public"}>
      <div className="container">
        <div className="header-logo">
          {user ? (
            <Fragment>
              {postItem !== "post" ? (
                <Link to={"/feed"}>
                  <img
                    alt="img"
                    width="30px"
                    src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${user.avatar}`}
                  />
                </Link>
              ) : (
                <a href="#" onClick={back}>
                  <img
                    alt="img"
                    width="30px"
                    src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${user.avatar}`}
                  />
                </a>
              )}
            </Fragment>
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
                  {postItem !== "post" ? (
                    <Link to={"/feed"}>Inicio</Link>
                  ) : (
                    <a href="#" onClick={back}>
                      Inicio
                    </a>
                  )}
                </li>
                <li className="hide-mobile">
                  <Link to={"/profile"}>Perfil</Link>
                </li>
                <li className="hide-mobile">
                  <a href="#!" onClick={signOut}>
                    {" "}
                    Cerrar sesión
                  </a>
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
