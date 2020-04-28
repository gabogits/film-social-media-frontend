import React, { useEffect, useContext } from "react";
import ReplyContext from "./../../context/reply/ReplyContext";
import Reply from "./../replies/Reply";


const ReplyList = ({post}) => {
  
  //const {_id } =post;
  const replyContext = useContext(ReplyContext);
  const { replies } = post;
  

  return (
    <div>
      {replies.length === 0 ? "no ha post": null}
    <div className="post-replies">
      <div className="post-replies-content">

      {replies.map(reply => (
        <Reply key={reply._id} reply={reply} />
      ))}
      </div>

    
      </div>
    </div>
  );
};

export default ReplyList;
