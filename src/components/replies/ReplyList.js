import React from "react";
import Reply from "./../replies/Reply";
import ReplyNew from "./../replies/Reply";
const ReplyList = () => {
  return (
    <div className="post-replies">
      <div className="post-replies-content">
        <Reply />
      </div>

      <ReplyNew />
    </div>
  );
};

export default ReplyList;
