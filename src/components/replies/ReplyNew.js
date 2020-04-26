import React, { useState, useContext, useEffect } from "react";
import ReplyContext from "../../context/reply/ReplyContext";

const ReplyNew = ({ post }) => {
  const { _id } = post;
  const replyContext = useContext(ReplyContext);
  const { newReply, selectReply, updateReply, cancelEdit } = replyContext;

  const replyinitialState = {
    text: "",
    picture: "",
  };
  useEffect(() => {
    if (selectReply === null) {
      saveReply(replyinitialState);
    } else {
      saveReply(selectReply);
    }
  }, []);
  const [reply, saveReply] = useState(replyinitialState);

  const { text, picture } = reply;

  const onChangeValue = (e) => {
    saveReply({
      ...reply,
      [e.target.name]:
        e.target.name !== "picture" ? e.target.value : e.target.files[0],
    });
  };

  const replyFormSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      return;
    }


    if (selectReply === null) {
      reply.post = _id;
      newReply(reply);
    }else {
      updateReply(reply);
    }
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
            type="button"
            className="button-primary u-full-width"
            value="Cancelar"
            onClick={cancelEdit}
          >
           Cancelar
          </button>
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
