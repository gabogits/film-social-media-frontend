import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/user/UserContext";
import PostContext from "../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";
import { useLocation } from "react-router-dom";

const ReplyNew = ({ post }) => {
  let location = useLocation();
  const replyContext = useContext(ReplyContext);
  const {
    newReply,
    selectReply,
    updateReply,
    cancelEdit,
    formReplyEdit,
  } = replyContext;
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const postContext = useContext(PostContext);
  const { resetPosts } = postContext;
  const { avatar } = user;

  const replyinitialState = {
    text: "",
    picture: "",
  };
  useEffect(() => {
    if (selectReply === null) {
      saveReply(replyinitialState);
    } else {
      if (!post) {
        saveReply(selectReply);
      }
    }
  }, [selectReply]);
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
      reply.post = post._id;
      reply.author = user.name;
      reply.pic = user.avatar;
      reply.creator = user._id;
      newReply(reply);
    } else {
      updateReply(reply);
    }

    const query = location.pathname.split("/");
    const postItem = query[1];

    if (postItem === "post") {
      resetPosts();
    }

    saveReply(replyinitialState);
  };

  return (
    <div className="post-add-reply">
      <div className="post-add-repply-inner">
        <form onSubmit={replyFormSubmit}>
          <div className="post-reply-avatar-small">
            <img
              width="30px"
              src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`}
            />
          </div>
          <div className="post-reply-input">
            <textarea
              placeholder="agrega alguna respuesta"
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
          {formReplyEdit ? (
            <button
              type="button"
              className="button-primary u-full-width"
              value="Cancelar"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          ) : null}
         {text.trim() !== "" ?
          <button
            type="submit"
            className="button-primary u-full-width"
            value="Publicar"
          >
            Publicar
          </button>
          : null 
          }
        </form>
      </div>
    </div>
  );
};

export default ReplyNew;
