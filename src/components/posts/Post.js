import React from "react";
import ReplyList from "../replies/ReplyList";

const Post = ({post}) => {

  const {text, avatar, picture, creator, registry} = post;
  const onChangeValue = e =>{
  
  }
  return (
    <div className="post">
      <div className="post-head">
        <div className="post-user-info">
          <div className="post-avatar-small">
            <img src={`images/${avatar}`}   alt="img" />
          </div>
          <div className="post-name-date">
            <p>{creator}</p>
            <p>{registry}</p>
          </div>
        </div>
      </div>
      <div className="post-body">
        <div className="post-body-txt">
          <p>
          {text}
          </p>
        </div>
        <div className="post-body-picture">
          {picture ? ( <img src={`images/${picture}`} alt="img"  />): null}
        </div>
      </div>
      <div className="post-rsm-feed">
        <p>
          <strong>2</strong> comentarios
        </p>
      </div>
      <div className="post-actions">
      <div className="score-bullets">
        <ul>
          <li>
            <div className="radio-score">
                <input type="radio" value={2}  name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
          <li>
            <div className="radio-score">
                <input type="radio" value={4}   name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
          <li>
            <div className="radio-score">
                <input type="radio" value={6}   name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
          <li>
            <div className="radio-score">
                <input type="radio" value={8}   name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
          <li>
            <div className="radio-score">
                <input type="radio" value={10}   name="score"   onChange={onChangeValue} ></input>
            </div>
          </li>
        </ul>
      </div>
        <button>commentar</button>
      </div>

    
    </div>
  );
};
//  <ReplyList  />
export default Post;
