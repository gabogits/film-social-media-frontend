import React, { Fragment } from "react";
import User from "./../user/User";

const RankingList = ({ users }) => {
  
  users.map((user) => {
    let userScoreTotal = 0;
    for (var item of user.ranking) {
      const score = parseInt(item.score);
      if (!isNaN(score)) {
        userScoreTotal = userScoreTotal + score;
      }
    }
    return user.userScoreTotal = userScoreTotal;
  });
  if (!users) return null;

  return (
    <Fragment>
      <div className="box-title">
        <h4>
          <span className="icon-format-2 icon-star activeScore"></span>{" "}
          Destacados
        </h4>
        <p>
          ¿Qué es una red social sin la aprobación pública?. Estas son las
          personas cuyo contenido ha obtenido más estrellas.
        </p>
      </div>

      <div className="ranking-list">
        <ul>
          {users
            .sort((a, b) => b.userScoreTotal - a.userScoreTotal)
            .map((user, idx) =>
              idx < 10 ? <User key={user._id} user={user} /> : null
            )}
        </ul>
      </div>
    </Fragment>
  );
};

export default RankingList;
