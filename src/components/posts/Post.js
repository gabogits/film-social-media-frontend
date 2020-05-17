import React, { useContext, useState, useEffect, Fragment } from "react";
import { format, register } from "timeago.js";
import ReplyList from "../replies/ReplyList";
import ReplyNew from "../replies/ReplyNew";
import PostContext from "./../../context/post/PostContext";
import ReplyContext from "./../../context/reply/ReplyContext";
import UserContext from "../../context/user/UserContext";
import { Link } from "react-router-dom";
import { localeFunc, formatURL } from "./../../helpers/";
var Text = require("react-format-text");

register("es_ES", localeFunc);

const Post = ({ post }) => {

  const postContext = useContext(PostContext);
  const { deletePost, postSelect } = postContext;

  const replyContext = useContext(ReplyContext);
  const { formReplyEdit, selectReply } = replyContext;

  const userContext = useContext(UserContext);
  const { user, setEvaluations } = userContext;

  const {
    text,
    picture,
    creator,
    registry,
    author,
    pic,
    _id,
    score,
    replies,
    numberReplies
  } = post;
  const rankingItems = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
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

  const onClickStar = (value, postId, user, creator) => {
    setStarts(value);
    const evaluation = {
      post: postId,
      score: value,
    };

    setEvaluations(evaluation, user, creator);
  };

  if (!post || !user) return null;
  return (
    <div className="post box-format">
      <div className="box-head">
        <div className="menu-options"></div>
        <div className="box-info">
          <div className="avatar-small">
            <Link
              to={creator === user._id ? `/profile` : `/profile/${creator}`}
            >
              <img
                src={
                  pic !== "n/a" && pic !== undefined
                    ? `${process.env.REACT_APP_BACKEND_URL}/api/image/${pic}`
                    : `./no-avatar.svg`
                }
                alt="img"
              />
            </Link>
          </div>
          <div className="box-name-date">
            <Link
              to={creator === user._id ? `/profile` : `/profile/${creator}`}
            >
              <strong>{author}</strong>
              <span> {format(registry, "es_ES")}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="box-body">
        <div className="box-body-txt">
          <p dangerouslySetInnerHTML={formatURL(text)}></p>
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
                  className={`radio-score icon-format-1 icon-star ${
                    item.id <= starts ? " activeScore" : null
                  }`}
                  key={item.id}
                  onClick={() => onClickStar(item.value, _id, user, creator)}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="creator-options">
            <Link
              to={`/post/edit/${_id}`}
              className="icon-format-1 icon-edit"
            ></Link>

            <button
              onClick={() => deletePost(_id)}
              className="icon-format-1 icon-delete"
            ></button>
          </div>
        )}

        <Link
          to={`/post/${_id}`}
          className="icon-format-1 icon-get-post"
        ></Link>
        <div className="center-btn" >
            <Link to={`/post/${_id}`} className="link-gray" >
              <span  className="icon-format-1 icon-comment"></span>Comentar
          </Link>
        </div>
        {numberReplies > 0 ? (
          <Link to={`/post/${_id}`} className="number-comments">
            <strong>{numberReplies}</strong> comentarios
          </Link>
        ) : null}
      </div>
      {postSelect ? <ReplyList post={post} /> : null }
      
      
      {formReplyEdit && _id === selectReply.post ? null : (
        <ReplyNew post={post} />
      )}
    </div>
  );
};
export default Post;
