import React from "react";
import User from "./User";

const UsersList = () => {
  return (
    <div className="UsersList">
      <h4>
        Usuarios <strong>(46)</strong>
      </h4>
      <ul>
        <User />
      </ul>
    </div>
  );
};

export default UsersList;
