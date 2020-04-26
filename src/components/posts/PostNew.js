import React, { useState, useContext, useEffect } from "react";
import PostContext from "../../context/post/PostContext";

const PostNew = () => {
  const postContext = useContext(PostContext);
  const { newPost, postSelect, updatePost, formPostEdit, cancelPost } = postContext;

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
    console.log(e.target.name);

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
      newPost(post);
    } else {
      updatePost(post);
    }

    savePost(postInitValues);
  };

  return (
    <div className="post-new">
      <h4>Agrega alguna publicación</h4>
      <div className="post-avatar-medium">
        <img src="images/1.jpg" alt="img" />
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
        <div className="score-bullets">
          <ul>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={2}
                  name="score"
                  onChange={onChangeValue}
                ></input>
              </div>
            </li>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={4}
                  name="score"
                  onChange={onChangeValue}
                ></input>
              </div>
            </li>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={6}
                  name="score"
                  onChange={onChangeValue}
                ></input>
              </div>
            </li>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={8}
                  name="score"
                  onChange={onChangeValue}
                ></input>
              </div>
            </li>
            <li>
              <div className="radio-score">
                <input
                  type="radio"
                  value={10}
                  name="score"
                  onChange={onChangeValue}
                ></input>
              </div>
            </li>
          </ul>
        </div>
        <button
          type="button"
          className="button-primary u-full-width"
          value="cancelar"
          onClick = {cancelPost}
        >
          cancelar
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
  );
};

export default PostNew;
