import React from "react";

const User = ({user}) => {
  
  const {name, avatar, id} = user;
  const goProfileUser = id => {
    
  }
  return (
    <li>
      <div className="user-avatar-medium" onClick={()=> goProfileUser(id)}>
        <img src={`images/${avatar}`} alt="img" />
        <span>{name}</span>
      </div>
    </li>
  );
};

export default User;
