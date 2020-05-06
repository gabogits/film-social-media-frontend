import React, { useState, useContext, useEffect } from "react";
import PostContext from "../../context/post/PostContext";
import UserContext from "../../context/user/UserContext";

const PostNew = ({ props }) => {
  const postContext = useContext(PostContext);
  const {
    newPost,
    postSelect,
    updatePost,
    formPostEdit,
    cancelPost,
  } = postContext;
  const userContext = useContext(UserContext);
  const { user } = userContext;

  const postInitValues = {
    text: "",
    picture: "",
    score: 0,
  };
  useEffect(() => {
    if (postSelect === null) {
      savePost(postInitValues);
    } else {
      savePost(postSelect);
    }
  }, [postSelect]);

  const [post, savePost] = useState(postInitValues);

  const { text, score } = post;

  const onChangeValue = (e) => {
    savePost({
      ...post,
      [e.target.name]:
        e.target.name !== "picture" ? e.target.value : e.target.files[0],
    });
  };

  const postFormSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      return;
    }
    if (score === "") {
      return;
    }

    if (postSelect === null) {
      post.author = user.name;
      post.pic = user.avatar;
      newPost(post);
    } else {
      updatePost(post);
      props.history.push(`/post/${post._id}`);
    }

    savePost(postInitValues);
  };

  const cancelEdit = (e) => {
    props.history.push(`/post/${post._id}`);
    e.preventDefault();
    cancelPost();
  };
  if (!user) return null;
  const { name, avatar} = user;
  return (
    <div className="post-new">
      <h4>Agrega alguna publicación</h4>
      <div className="post-avatar-medium">
        <img
          width="30px"
          src={
            avatar !== "n/a" && avatar !== undefined
              ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${avatar}`
              : `./no-avatar.svg`
          }
        />
        {name}
      </div>
      <form onSubmit={postFormSubmit}>
        <div className="post-new-content">
          <textarea
            placeholder="agrega una publicacion"
            name="text"
            value={text}
            onChange={onChangeValue}
          ></textarea>
        </div>

        <div className="post-new-actions">
          <div className="post-new-addimage">
            <input
              type="file"
              className="u-full-width"
              name="picture"
              onChange={onChangeValue}
            />
          </div>
        </div>
        {formPostEdit ? (
          <button
            type="button"
            className="button-primary u-full-width"
            value="cancelar"
            onClick={cancelEdit}
          >
            cancelar
          </button>
        ) : null}
        <button
          type="submit"
          className="button-primary u-full-width"
          value="Publicar"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default PostNew;
