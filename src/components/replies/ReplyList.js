import React from "react";
import Reply from "./../replies/Reply";
import ReplyNew from "./../replies/ReplyNew";
const ReplyList = () => {

  const replies = [
    {
      id: "223",
      text: "Cras viverra quam non molestie ornare. Duis nec ex i",      
      creator: "diego lopez",
    
    },
    {
      id: "3324",
      text: "Duis nec ex i",      
      creator: "pepe pecas",
      registry: "25 de octubre",
      avatar: "2.jpg",
    }
  ];
console.log(replies)
  return (
    
    <div className="post-replies">
      <div className="post-replies-content">

      {replies.map(reply => (
        <Reply key={reply.id} reply={reply} />
      ))}
      </div>

      <ReplyNew />
    </div>
  );
};

export default ReplyList;
