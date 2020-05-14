import React, {useContext} from "react";
import { Link } from "react-router-dom";

import UserContext from "./../../context/user/UserContext";

const BottomBar = () => {

    const userContext = useContext(UserContext);
    const { signOut } = userContext;

   
  return (
    <section className="bottom-bar mobile-element">
      <div className="bottom-bar_inner">
        <ul>
          <li>
            <Link className="icon-bottom icon-home" to={"/feed"}></Link>
          </li>
          <li>
            <Link className="icon-bottom icon-profile" to={"/profile"}></Link>
          </li>
          <li>
          <Link to={"/ranking"} className={`icon-bottom icon-star2`}></Link>
          </li>
          <li>
          <Link   to={"/users"} className={`icon-bottom icon-users`}></Link>
          </li>
          <li>
            <a href="#!" onClick={signOut}   className="icon-bottom icon-logout"></a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BottomBar;
