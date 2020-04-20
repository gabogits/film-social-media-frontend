import React from "react";
const ReplyNew = () => {
  return (
    <div className="post-add-reply">
      <div className="post-add-repply-inner">
        <div className="post-reply-avatar-small">
          <img src="images/1.jpg" />
        </div>
        <div className="post-reply-input">
          <textarea rows="3"></textarea>
        </div>
        <div className="post-reply-addimage">
          <input type="file" className="u-full-width" />
        </div>
      </div>
    </div>
  );
};

export default ReplyNew;
