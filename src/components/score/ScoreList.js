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
    <div className="box-title">
        <h4>  Ranking</h4>
      </div>
      <div className="ranking-list">
        <ul>
        {users
          .sort((a, b) => b.userScoreTotal - a.userScoreTotal)
          .map((user, idx) => (
            <User key={user._id} user={user} idx={idx} />
          ))}
          </ul>
      </div>
    </Fragment>
  );
};

export default RankingList;
