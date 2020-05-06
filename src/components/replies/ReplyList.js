import React from "react";
import Reply from "./../replies/Reply";

const ReplyList = ({ post }) => {
  const { replies } = post;

  if (!replies) return null;
  return (
    <div>
      {replies.length === 0 ? "no ha post" : null}
      <div className="post-replies">
        <div className="post-replies-content">
          <p>comentariors {replies.length}</p>
          {replies.map((reply) => (
            <Reply key={reply._id} reply={reply} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReplyList;
