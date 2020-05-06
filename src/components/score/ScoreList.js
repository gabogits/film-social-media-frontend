import React, { Fragment } from "react";
import User from "./../user/User";

const RankingList = ({ users }) => {
  if (!users) return null;

  users.map((user) => {
    let userScoreTotal = 0;
    for (var item of user.ranking) {
      const score = parseInt(item.score);
      if (!isNaN(score)) {
        userScoreTotal = userScoreTotal + score;
      }
    }
    user.userScoreTotal = userScoreTotal;
  });

  return (
    <Fragment>
      <h2>Usuarios</h2>
      <div className="ranking">
        {users
          .sort((a, b) => b.userScoreTotal - a.userScoreTotal)
          .map((user) => (
            <User key={user._id} user={user} />
          ))}
      </div>
    </Fragment>
  );
};

export default RankingList;
