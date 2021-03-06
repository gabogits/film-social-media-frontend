import React, {useContext} from "react";
import UserContext from "./../../context/user/UserContext";
import { Link } from "react-router-dom";


const User = ({ userItem }) => {
  const userContext = useContext(UserContext);
const {  user } = userContext;
  const { name, avatar, _id, userScoreTotal } = userItem;

  return (
    <li>
      <Link
        className="user-avatar-medium"
        to={ _id !== user._id ? `/friend/${_id}` : `/profile`}
      >
        <div className="avatar-dinamic">
          <img
            width="30px"
            src={
              avatar !== "n/a" && avatar !== undefined
                ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`
                : `./no-avatar.svg`
            }
            alt={name}
          />
        </div>
        <div className="user-info">
          <strong className="name-user"> {name}</strong>
          <small className="score-user">{userScoreTotal}</small>
        </div>
      </Link>
    </li>
  );
};

export default User;
