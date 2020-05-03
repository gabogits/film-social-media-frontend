import React from "react";
import { Link } from "react-router-dom";

const User = ({user}) => {
  
  const {name, avatar, _id} = user;
  const goProfileUser = id => {
    console.log(id)
    
  }
  return (
    <li>
      <Link className="user-avatar-medium" to={`/profile/${_id}`}>
        <img width="30px" src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}  />
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default User;
