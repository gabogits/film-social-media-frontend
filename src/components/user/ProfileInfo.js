import React, { useContext, useEffect, useState } from "react";
import UserContext from "./../../context/user/UserContext";

const ProfileInfo = ({ profile }) => {
  const userContext = useContext(UserContext);
  const {
    user,
    editUser,
    users,
    getUserById,
    getUsers,
    profileSelect,
    resetProfile,
  } = userContext;

  useEffect(() => {
    getUsers();
    if (profile && users.length) {
      getUserById(profile);
    }
    if (profileSelect === null) {
      saveUserInfo(user);
    } else {
      saveUserInfo(profileSelect);
    }
    if (!profile) {
      resetProfile();
    }
    // eslint-disable-next-line
  }, [profileSelect, users.length, profile]);

  const userInitValues = {
    name: "",
    avatar: "",
    email: "",
    description: "",
    _id: "",
  };

  const [userInfo, saveUserInfo] = useState(userInitValues);

  const { name, avatar,  description, _id } = userInfo;

  return (
    <div className="info-box">
      <div className="container">
        <div className="info-box-inner">
          <div className="avatar-big">
            {avatar ? (
              <img
                src={avatar !== "n/a"   &&  avatar !== undefined ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}` :  `./../../no-avatar-white.svg`}
                alt="img"
              />
            ) : null}
          </div>
          <div className="info-table">
            <h3>
              <strong>{name}</strong>
            </h3>
            <p>{description}</p>
            {_id === user._id ? (
              <button
                className="link-style"
                onClick={() => editUser(user)}
              >
                Editar información
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
