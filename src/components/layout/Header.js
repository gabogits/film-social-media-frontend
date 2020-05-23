import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import UserContext from "./../../context/user/UserContext";
import PostContext from "./../../context/post/PostContext";

const Header = ({ props }) => {
  const userContext = useContext(UserContext);
  const { signOut, user, page } = userContext;
  const postContext = useContext(PostContext);
  const {
    resetPostState
  } = postContext;
  const query = props.location.pathname.split("/");
  const postItem = query[1];
  const back = () => {
    props.history.go(-1);
  };
  const SesionEnds = () => {
    resetPostState()
    signOut();
  } 
  return (
    <header className={user ? "private" : "public"}>
      <div className="container">
        <div className="header-logo">
          {user ? (
            <Fragment>
              {postItem !== "post" && page === "feed" ? (
                <Link to={"/feed"}>
                  <img
                    alt="img"
                    width="30px"
                    src={
                      user.avatar !== "n/a" && user.avatar !== undefined
                        ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${user.avatar}`
                        : `./no-avatar.svg`
                    }
                  />
                </Link>
              ) : (
                <button onClick={back}>
                  <img
                    alt="img"
                    width="30px"
                    src={
                      user.avatar !== "n/a" && user.avatar !== undefined
                        ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${user.avatar}`
                        : `./no-avatar.svg`
                    }
                  />
                </button>
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
                  {postItem === "post" && page === "feed" ? (
       
                  <button onClick={back}>
                    Inicio
                  </button>
                  ) : (
                    <Link to={"/feed"}>Inicio</Link>
                  )}
                </li>
                <li className="hide-mobile">
                  {postItem === "post" && page === "profile" ? (
                      <button   onClick={back}>
                      Perfil
                    </button>
                  ) : (
                    <Link to={"/profile"}>Perfil</Link>
                  )}


                </li>
                <li className="hide-mobile">
                  <button onClick={SesionEnds}>
                    Cerrar sesión
                  </button>
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
