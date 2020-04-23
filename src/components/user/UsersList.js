import React from "react";
import User from "./User";

const UsersList = () => {
  
  const users = [
    {
      id: 1,
      name: "juan",
      avatar: "1.pg"
    },
    {
      id: 2,
      name: "pedro",
      avatar: "2.pg"
    },
    {
      id: 3,
      name: "pepe",
      avatar: "3.pg"
    },
  ]
  return (
    <div className="UsersList">
      <h4>
        Usuarios <strong>({users.length})</strong>
      </h4>
      <ul>
        {users.map(user => (
            <User key={user.id} user={user} />
        ))}
       
      </ul>
    </div>
  );
};

export default UsersList;
