import React, { useContext, useEffect } from "react";
import Header from "./Header";
import ScoreList from "./../score/ScoreList";

import BottomBar from "./BottomBar";
import UserContext from "../../context/user/UserContext";
const Users = (props) => {
  const userContext = useContext(UserContext);
  const { userAuth, user, users, getUsers, auth } = userContext;

  useEffect(() => {
    userAuth();
    getUsers();
    // eslint-disable-next-line
  }, [auth]);

  if (!user || !users) return null;

  return (
    <main className="top-space">
      <Header props={props}></Header>
      <div className="container">
        <div className="content-center">
          <div className="box-format box-score">
            <ScoreList users={users} />
          </div>
        </div>
      </div>
      <BottomBar props={props} />
    </main>
  );
};

export default Users;
