import React, {useContext, useEffect} from "react";
import User from "./User";
import UserContext from "./../../context/user/UserContext"

const UsersList = () => {

  const userContext = useContext(UserContext)
  const { users, getUsers} = userContext;
  console.log(users)
  useEffect(()=>{
    getUsers()
     // eslint-disable-next-line
   }, [])

  return (
    <div className="UsersList">
      <h4>
        Usuarios <strong>({users.length})</strong>
      </h4>
      <ul>
        {users.map(user => (
            <User key={user._id} user={user} />
        ))}
       
      </ul>
    </div>
  );
};

export default UsersList;
