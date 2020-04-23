import React from "react";

const Score = ({scoreItem}) => {
  return (
    <div className="ranking-item">
      <div className="ranking-img">
        <img src="images/1.jpg"  alt="img"  />
      </div>
      <div className="ranking-text">
        <h5>atypical </h5>
        <div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>

          <h6>
            <strong>9.7</strong>
          </h6>
        </div>
        <p>Diego</p>
      </div>
    </div>
  );
};

export default Score;
