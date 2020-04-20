import React from "react";
import ReplyList from "../replies/ReplyList";

const Post = () => {
  return (
    <div className="post">
      <div className="post-head">
        <div className="post-user-info">
          <div className="post-avatar-small">
            <img src="images/1.jpg" />
          </div>
          <div className="post-name-date">
            <p>Diego Perez</p>
            <p>12 horas</p>
          </div>
        </div>
      </div>
      <div className="post-body">
        <div className="post-body-txt">
          <p>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper
            dolor nec ipsum consectetur volutpat. Quisque mattis eleifend nunc,
            et molestie quam vehicula quis. Cras viverra quam non molestie
            ornare. Duis nec ex id enim ultricies efficitur. Duis semper, tortor
            hendrerit tempus blandit, magna libero semper urna,
          </p>
        </div>
        <div className="post-body-picture">
          <img src="images/1.jpg" />
        </div>
      </div>
      <div className="post-rsm-feed">
        <p>
          <strong>2</strong> comentarios
        </p>
      </div>
      <div className="post-actions">
        <button>calificar </button>
        <button>commentar</button>
      </div>

      <ReplyList />
    </div>
  );
};

export default Post;
