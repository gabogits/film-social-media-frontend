import React from "react";
import User from "./User";

const UsersList = ({ users }) => {
  if (!users) return null;
  return (
    <div className="UsersList">

      <div className="box-title">
        <h4>  Usuarios <strong>({users.length})</strong></h4>
      </div>
      <form>
        <ul>
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </ul>
      </form>
    </div>
  );
};

export default UsersList;
