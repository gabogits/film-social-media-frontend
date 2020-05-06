import React, { useContext, useState, useEffect, Fragment } from "react";
import { format, register } from "timeago.js";
import ReplyList from "../replies/ReplyList";
import ReplyNew from "../replies/ReplyNew";
import PostContext from "./../../context/post/PostContext";
import ReplyContext from "./../../context/reply/ReplyContext";
import UserContext from "../../context/user/UserContext";
import { Link } from "react-router-dom";
import { localeFunc } from "./../../helpers/";
register("es_ES", localeFunc);

const Post = ({ post }) => {
  const postContext = useContext(PostContext);
  const { deletePost } = postContext;

  const replyContext = useContext(ReplyContext);
  const { formReplyEdit, selectReply } = replyContext;

  const userContext = useContext(UserContext);
  const { user, setEvaluations } = userContext;

  const { text, picture, creator, registry, author, pic, _id, score, replies } = post;
  const rankingItems = [
    { id: 1, value: 2 },
    { id: 2, value: 4 },
    { id: 3, value: 6 },
    { id: 4, value: 8 },
    { id: 5, value: 10 },
  ];

  const scoreInit = 0;
  useEffect(() => {
    if (score > 0) {
      setStarts(score);
    } else {
      setStarts(scoreInit);
    }
  }, []);

  const [starts, setStarts] = useState(scoreInit);
  const [menuOptions, saveMenuOptions] = useState(false);

  const onClickStar = (value, postId, user, creator) => {
    setStarts(value);
    const evaluation = {
      post: postId,
      score: value,
    };

    setEvaluations(evaluation, user, creator);
  };

  const showMenuOptions = () => {
    saveMenuOptions(!menuOptions);
  };
  if (!post || !user) return null;
  return (
    <div className="post box-format">
      <div className="box-head">
        <div className="menu-options">
          <div className="menu-options-show" onClick={() => showMenuOptions()}>
            mostrar menu
          </div>
          {menuOptions ? (
            <ul>
              {creator === user._id ? (
                <Fragment>
                  <li>
                    <Link to={`/post/edit/${_id}`}>editar post</Link>
                  </li>
                  <li>
                    <a href="#!" onClick={() => deletePost(_id)}>
                      Borrar post
                    </a>
                  </li>
                </Fragment>
              ) : null}
              <li>
                <Link to={`/post/${_id}`}>Obtener post</Link>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="box-info">
          <div className="avatar-small">
            <img
              src={
                pic !== "n/a" && pic !== undefined
                  ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${pic}`
                  : `./no-avatar.svg`
              }
              alt="img"
            />
          </div>
          <div className="box-name-date">
            <strong>{author}</strong>
            <span> {format(registry, "es_ES")}</span>
          </div>
        </div>
      </div>
      <div className="box-body">
        <div className="box-body-txt">
          <p>{text}</p>
        </div>
        <div className="box-body-picture">
          {picture !== "n/a" && picture !== undefined ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/api/image/${picture}`}
              alt="img"
            />
          ) : null}
        </div>
      </div>
      <div className="box-body-actions">
        {creator !== user._id ? (
          <div className="score-bullets">
            <div className="ranking">
              {rankingItems.map((item) => (
                <div
                  className={`radio-score ${
                    item.id <= starts / 2 ? " activeScore" : null
                  }`}
                  key={item.id}
                  onClick={() => onClickStar(item.value, _id, user, creator)}
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <Link to={`/post/${_id}`} className="mobile-element">Comentar</Link>

        {replies.length > 0 ? (
          <Link to={`/post/${_id}`} className="number-comments">
            <strong>{replies.length}</strong> comentarios
          </Link>
        ) : null}
      </div>
      <ReplyList post={post} />

      {formReplyEdit && _id === selectReply.post ? null : (
        <ReplyNew post={post} />
      )}
    </div>
  );
};
// {!formReplyEdit ? <ReplyList post={post}  />: <ReplyNew  post={post} /> }
export default Post;
