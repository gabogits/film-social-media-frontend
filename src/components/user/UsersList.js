import React, {useContext, useEffect} from "react";
import User from "./User";
import UserContext from "./../../context/user/UserContext"

const UsersList = ({users}) => {


   if(!users) return null;
  return (
    <div className="UsersList">
      <h4>
        Usuarios <strong>({users.length})</strong>
      </h4>
      <form>
      <ul>
        {users.map(user => (
            <User key={user._id} user={user} />
        ))}
       
      </ul>
      </form>
    </div>
  );
};

export default UsersList;
