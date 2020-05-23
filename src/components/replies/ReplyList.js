import React from "react";
import Reply from "./../replies/Reply";

const ReplyList = ({ post }) => {
  const { replies, postSelect } = post;

  if (!replies || replies.length === 0 || postSelect === null) return null;

  return (
    <div className="box-replies">
      <div className="box-replies-content">
        {replies.map((reply) =>  typeof(reply) === "object" ?  <Reply key={reply._id} reply={reply} /> : null )}
      </div>
    </div>
  );
};

export default ReplyList;

