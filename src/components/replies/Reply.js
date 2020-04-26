import React, {useContext} from "react";
import ReplyContext from "../../context/reply/ReplyContext"

const Reply = ({reply}) => {
  const {text, avatar, picture, creator, registry, id} = reply;
  const replyContext = useContext(ReplyContext)
  const {getReply, deleteReply} =replyContext;
  return (
    <div className="post-reply">
              <button onClick={()=>getReply(reply)} >Editar reply</button>
        <button onClick={()=>deleteReply(reply)} >Borrar reply</button>
      <div className="post-reply-avatar-small">
      <img src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}    alt="img" />
      </div>
      <div className="post-reply-txt">
  
            <p>{creator}</p>
            <p>{registry}</p>
            <p>{text}</p>
            {picture ? ( <img src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}  alt="img"  />): null}
      </div>
    </div>
  );
};

export default Reply;
