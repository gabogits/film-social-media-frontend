import React from "react";
import Reply from "./../replies/Reply";

const ReplyList = ({ post }) => {
  const { replies } = post;

  if (!replies || replies.length === 0 ) return null;
  return (
    
      <div className="box-replies">
        <div className="box-replies-content">

          {replies.map((reply) => (
            <Reply key={reply._id} reply={reply} />
          ))}
        </div>
      </div>

  );
};

export default ReplyList;
