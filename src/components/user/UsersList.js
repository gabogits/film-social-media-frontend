import React from "react";
import User from "./User";

const UsersList = ({ users }) => {
  if (!users) return null;
  return (
    <div className="UsersList">

      <div className="box-title">
        <h4> Amigos <strong>({users.length})</strong></h4>
        <p>En este primera versión, todos somos <br/>amigos de todos :)</p>
      </div>
      <form>
        <ul>
          {users.map((user, idx) => (
            <User key={user._id} user={user} />
          ))}
        </ul>
      </form>
    </div>
  );
};

export default UsersList;
