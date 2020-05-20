import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "./../../context/user/UserContext";

const BottomBar = ({ props }) => {
  const userContext = useContext(UserContext);
  const { signOut } = userContext;
  const query = props.location.pathname.split("/");
  const postItem = query[1];
  const back = () => {
    props.history.go(-1);
  };

  return (
    <section className="bottom-bar mobile-element">
      <div className="bottom-bar_inner">
        <ul>
          <li>
            {postItem !== "post" ? (
              <Link className="icon-bottom icon-home" to={"/feed"}></Link>
            ) : (
              <a href="#" className="icon-bottom icon-home" onClick={back}></a>
            )}
          </li>
          <li>
            <Link className="icon-bottom icon-profile" to={"/profile"}></Link>
          </li>
          <li>
            <Link to={"/ranking"} className={`icon-bottom icon-star2`}></Link>
          </li>
          <li>
            <Link to={"/users"} className={`icon-bottom icon-users`}></Link>
          </li>
          <li>
            <a
              href="#!"
              onClick={signOut}
              className="icon-bottom icon-logout"
            ></a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BottomBar;
