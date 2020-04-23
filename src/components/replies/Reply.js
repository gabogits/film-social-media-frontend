import React from "react";

const Reply = ({reply}) => {
  const {text, avatar, picture, creator, registry, id} = reply;
  return (
    <div className="post-reply">
      <div className="post-reply-avatar-small">
      <img src={`images/${avatar}`}   alt="img" />
      </div>
      <div className="post-reply-txt">
  
            <p>{creator}</p>
            <p>{registry}</p>
            <p>{text}</p>
            {picture ? ( <img src={`images/${picture}`} alt="img"  />): null}
      </div>
    </div>
  );
};

export default Reply;
