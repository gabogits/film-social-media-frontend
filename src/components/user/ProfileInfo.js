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
    resetProfile
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
    if(!profile) {
      resetProfile()
    }
  }, [profileSelect,  users.length, profile]);


  const userInitValues = {
    name: "",
    avatar: "",
    email: "",
    description: "",
    _id: "",
  };

  const [userInfo, saveUserInfo] = useState(userInitValues);

  const { name, avatar, email, description, _id } = userInfo;

  return (
    <div className="info-box">
      <div className="container">
        <div className="info-box-inner">
          <div className="avatar-big">
            {avatar ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}
                alt="img"
              />
            ) : null}
          </div>
          <div className="info-table">
            <h3>
              <strong>{name}</strong>
            </h3>
            <h5>{email}</h5>
            <p>
             
              {description}
            </p>
            {_id === user._id ? (
              <a
                href="#!"
                className="link-style"
                onClick={() => editUser(user)}
              >
                Editar información
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
