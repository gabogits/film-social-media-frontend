import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  const { name, avatar, _id, userScoreTotal } = user;

  return (
    <li>
      <Link className="user-avatar-medium" to={`/friend/${_id}`}>
       
        <div className="avatar-dinamic">
        <img
          width="30px"
          src={
            avatar !== "n/a" && avatar !== undefined
              ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`
              : `./no-avatar.svg`
          }
          alt="img"
        />
        </div>
        <div className="user-info">
          
            <strong className="name-user"> {name}</strong>
          <small className="score-user">
            {userScoreTotal}
          </small>
        </div>
        
      </Link>
    </li>
  );
};

export default User;
