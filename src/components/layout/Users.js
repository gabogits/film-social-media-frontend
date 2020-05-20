import React, { useContext, useEffect } from "react";
import Header from "./Header";
import UsersList from "./../user/UsersList";

import BottomBar from "./BottomBar";
import UserContext from "../../context/user/UserContext";
const Users = (props) => {
  const userContext = useContext(UserContext);
  const { userAuth, user, users, getUsers, auth } = userContext;

  useEffect(() => {
    userAuth();
    getUsers();
  }, [auth]);

  if (!user || !users) return null;

  return (
    <main className="top-space">
      <Header props={props}></Header>
      <div className="container">
        <div className="content-center">
          <div className="box-format">
            <UsersList users={users} />
          </div>
        </div>
      </div>
      <BottomBar props={props} />
    </main>
  );
};

export default Users;
