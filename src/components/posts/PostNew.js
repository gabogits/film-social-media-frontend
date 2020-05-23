import React, { useState, useContext, useEffect } from "react";
import PostContext from "../../context/post/PostContext";
import UserContext from "../../context/user/UserContext";
import TextareaAutosize from "react-autosize-textarea";
import previewImg from "./../../helpers/previewImg";
import Loader from "../templates/Loader";

const PostNew = ({ props }) => {
  const postContext = useContext(PostContext);
  const {
    newPost,
    postSelect,
    updatePost,
    formPostEdit,
    cancelPost,
    loader,
  } = postContext;
  const userContext = useContext(UserContext);
  const { user } = userContext;

  const postInitValues = {
    text: "",
    picture: "",
  };
  useEffect(() => {
    if (postSelect === null) {
      savePost(postInitValues);
    } else {
      savePost(postSelect);
    }
     // eslint-disable-next-line
  }, [postSelect]);

  const [post, savePost] = useState(postInitValues);
  const [pictureToUpload, savePictureToUpload] = useState(null);

  const { text, picture } = post;

  const onChangeValue = (e) => {
    if (e.target.name === "picture") {
      previewImg(e, savePictureToUpload);
    }
    savePost({
      ...post,
      [e.target.name]:
        e.target.name !== "picture" ? e.target.value : e.target.files[0],
    });
  };

  const postFormSubmit = (e) => {
    e.preventDefault();

    if (
      (text === "" || text.trim() === "") &&
      (picture === "n/a" || picture === undefined)
    ) {
      return;
    }

    if (postSelect === null) {

      newPost(post);
    } else {
      updatePost(post, user, true);
      props.history.push(`/post/${post._id}`);
    }

    savePost(postInitValues);
    savePictureToUpload(null);
  };

  const cancelEdit = (e) => {
    props.history.push(`/post/${post._id}`);
    e.preventDefault();
    cancelPost();
  };
 
  if (!user) return null;
  const { name, avatar } = user;
  return (
    <div className="post-new box-format">
      <div className="box-title">
        {!formPostEdit ? (
          <h4>Buen día {name}</h4>
        ) : (
          <h4>Edita tu publicación</h4>
        )}
      </div>
      <div className="new-content">
        <div className="avatar-medium">
          <img
          alt="img"
            src={
              avatar !== "n/a" && avatar !== undefined
                ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`
                : `./no-avatar.svg`
            }
          />
        </div>
        <div className="new-content-form">
          <form onSubmit={postFormSubmit}>
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
                placeholder={`¿Qué tenemos para el dia de hoy?`}
                name="text"
                value={text}
                onChange={onChangeValue}
              />
            </div>
            { pictureToUpload ? (
              <div className="preview-img">
                <img src={pictureToUpload} alt="img" />
              </div>
            ) : null}

            {postSelect &&
            !pictureToUpload &&
            picture !== "n/a" &&
            picture !== undefined  ? (
              <div className="preview-img">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}
                  alt="img"
                />
              </div>
            ) : null}
            {loader ? <Loader /> : null}
            <div className="new-content-actions">
              {formPostEdit ? (
                <button
                  type="button"
                  className="button-primary btn-color-2 btn-size-1 btn-orientation-l"
                  value="cancelar"
                  onClick={cancelEdit}
                >
                  Cancelar
                </button>
              ) : null}

              {(text !== "" && !loader) || (picture !== "" && !loader) ? (
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
    </div>
  );
};

export default PostNew;
