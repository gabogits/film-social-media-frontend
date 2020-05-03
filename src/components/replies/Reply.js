import React, {useContext} from "react";
import ReplyContext from "../../context/reply/ReplyContext"
import UserContext from "../../context/user/UserContext";

const Reply = ({reply}) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const { name, avatar, _id } = user;

  const {text, picture, creator, registry, pic, author} = reply;

  const replyContext = useContext(ReplyContext)
  const {getReply, deleteReply} =replyContext;
  return (
    <div className="post-reply">
         {creator === _id ? 
        (
        <div className="menu-opciones-item">
              <button onClick={()=>getReply(reply)} >Editar reply</button>
        <button onClick={()=>deleteReply(reply)} >Borrar reply</button>
          </div>
        ): null}
     
       
       


      <div className="post-reply-avatar-small">
      <img  width="30px" src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${reply.pic}`}    alt="img" />
   
      </div>
      <div className="post-reply-txt">
  
            <p> nombre{reply.author}</p>
            <p>{registry}</p>
            <p>{text}</p>
            {picture ? ( <img src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}  alt="img"  />): null}
      </div>
    </div>
  );
};

export default Reply;
