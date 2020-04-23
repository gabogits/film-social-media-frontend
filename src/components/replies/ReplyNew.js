import React, { useState, useContext } from "react";
import ReplyContext from "../../context/reply/ReplyContext";

const ReplyNew = ({post}) => {
  
  const {_id } =post;
  const replyContext = useContext(ReplyContext)
  const {newReply} =replyContext;
console.log(_id)
  const [reply, saveReply] = useState({
    text: "",
    picture: "",
  });

  const { text, picture } = reply;

  const onChangeValue = (e) => {

    saveReply({
      ...reply,
       [e.target.name]: e.target.name !== "picture" ?  e.target.value : e.target.files[0]
    });
  };

  const replyFormSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      return;
    }
   
    try {
      reply.post = _id;
      newReply(reply)
    } catch (error) {
      console.log(error);
    }

    saveReply({
      text: "",
      picture: "",
    });
  };

  return (
    <div className="post-add-reply">
      <div className="post-add-repply-inner">
        <form onSubmit={replyFormSubmit}>
          <div className="post-reply-avatar-small">
            <img src="images/1.jpg" alt="img" />
          </div>
          <div className="post-reply-input">
            <textarea
              placeholder="agrega una publicacion"
              name="text"
              value={text}
              onChange={onChangeValue}
            ></textarea>
          </div>
          <div className="post-reply-addimage">
            <input
              type="file"
              className="u-full-width"
              name="picture"

      
              onChange={onChangeValue}
            />
          </div>
          <button
            type="submit"
            className="button-primary u-full-width"
            value="Publicar"
          >
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReplyNew;
