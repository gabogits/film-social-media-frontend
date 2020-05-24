import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "./../../context/user/UserContext";
import PostContext from "./../../context/post/PostContext";

const BottomBar = ({ props }) => {
  const userContext = useContext(UserContext);
  const { signOut, page } = userContext;
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
    <section className="bottom-bar mobile-element">
      <div className="bottom-bar_inner">
        <ul>
          <li>
            {postItem === "post" && page === "feed" ? (
              <button className="icon-bottom icon-home" onClick={back}></button>
            ) : (
              <Link className="icon-bottom icon-home" to={"/feed"}></Link>
            )}
          </li>
          <li>
            {postItem === "post" && page === "profile" ? (
              <button
                className="icon-bottom icon-profile"
                onClick={back}
              ></button>
            ) : (
              <Link className="icon-bottom icon-profile" to={"/profile"}></Link>
            )}
          </li>
          <li>
            <Link to={"/ranking"} className={`icon-bottom icon-star2`}></Link>
          </li>
          <li>
            <Link to={"/users"} className={`icon-bottom icon-users`}></Link>
          </li>
          <li>
            <button
              onClick={SesionEnds}
              className="icon-bottom icon-logout"
            ></button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BottomBar;
