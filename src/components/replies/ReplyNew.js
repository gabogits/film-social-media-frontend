import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/user/UserContext";
import PostContext from "../../context/post/PostContext";
import ReplyContext from "../../context/reply/ReplyContext";
import { useLocation } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import previewImg from "./../../helpers/previewImg";
import Loader from "../templates/Loader"

const ReplyNew = ({ post }) => {
  let location = useLocation();
  const replyContext = useContext(ReplyContext);
  const {
    newReply,
    selectReply,
    updateReply,
    cancelEdit,
    formReplyEdit,
    loader
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
  const [pictureToUpload, savePictureToUpload] = useState(null);

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
    if (e.target.name === "picture") {
      previewImg(e, savePictureToUpload);
    }
    saveReply({
      ...reply,
      [e.target.name]:
        e.target.name !== "picture" ? e.target.value : e.target.files[0],
    });
  };

  const replyFormSubmit = (e) => {
    e.preventDefault();

    if (
      (text === "" || text.trim() === "") &&
      (picture === "n/a" || picture === undefined)
    ) {
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
    savePictureToUpload(null);
  };

  return (
    <div className="new-content">
      <div className="avatar-small-2">
        <img
          src={
            avatar !== "n/a" && avatar !== undefined
              ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`
              : `./no-avatar.svg`
          }
        />
      </div>
      <div className="new-content-form">
        <form onSubmit={replyFormSubmit}>
          <div className="new-content-textarea textarea-1">
            <div className="add-image">
              <input
                type="file"
                className="u-full-width"
                name="picture"
                onChange={onChangeValue}
              />
            </div>

            <TextareaAutosize
              placeholder={`Escribe un comentario`}
              name="text"
              value={text}
              onChange={onChangeValue}
            />
          </div>
          {pictureToUpload ? (
            <div className="preview-img">
              <img src={pictureToUpload} />
            </div>
          ) : null}

          {selectReply && !post && !pictureToUpload && picture !== "n/a" && picture !== undefined ? (
            <div className="preview-img">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}
                alt="img"
              />
            </div>
          ) : null}

          {loader ? <Loader /> : null }
          <div className="new-content-actions">
            {formReplyEdit && !post ?  (
              <button
                type="button"
                className="button-primary btn-color-2 btn-size-1 btn-orientation-l"
                value="cancelar"
                onClick={cancelEdit}
              >
                Cancelar
              </button>
            ) : null}
            {text !== "" && !loader  || picture !== "" && !loader  ? (
              <button
                type="submit"
                className="button-primary btn-color-1 btn-size-1 btn-orientation-r"
                value="Publicar"
              >
                Publicar
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyNew;
