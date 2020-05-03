import React, {useContext, useEffect, useState} from "react";
import UserContext from "./../../context/user/UserContext"

const ProfileInfo = ({profileInfo}) => {
  const userContext = useContext(UserContext)
  const {user, editUser} = userContext;

  
  const {name, avatar, email, description, _id} =profileInfo;
  return (
    <div>
      <div className="avatar">
      {avatar ? (
              <img
                width="30px"
                src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}
                alt="img"
              />
            ) : null}
      </div>
      <p>
        Nombre: <strong>{name}</strong>
      </p>
      <p>
        Correo: <strong>{email}</strong>
      </p>
      <p>
        Description <strong>{description}</strong>
      </p>
      {_id === user._id ? 
        (
      <button onClick={() => editUser(profileInfo)}>editar infromacion</button>
        ) : null};
    </div>
  );
};

export default ProfileInfo;
