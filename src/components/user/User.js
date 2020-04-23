import React from "react";

const User = ({user}) => {
  
  const {name, avatar, id} = user;
  const goProfileUser = id => {
    
  }
  return (
    <li>
      <div className="user-avatar-medium" onClick={()=> goProfileUser(id)}>
        <img width="30px" src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}  />
        <span>{name}</span>
      </div>
    </li>
  );
};

export default User;
