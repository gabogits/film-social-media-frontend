import React from "react";
import { Link } from "react-router-dom";

const User = ({user}) => {
  
  const {name, avatar, _id, userScoreTotal} = user;
  const goProfileUser = id => {
    console.log(id)
    
  }
  return (
    <li>
      <Link className="user-avatar-medium" to={`/profile/${_id}`}>
        <img width="30px" src={avatar !== "n/a" && avatar !== undefined   ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}` : `./no-avatar.svg`}  />
        <span>{name}  {userScoreTotal}</span>
      </Link>
    </li>
  );
};

export default User;
